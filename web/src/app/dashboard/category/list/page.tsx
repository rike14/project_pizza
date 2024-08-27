"use client"
import Loading from '@/app/components/loading/loading'
import { getCookieClient } from '@/lib/cookieClient'
import { api } from '@/services/app'
import { RefreshCcw, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { toast } from 'sonner'
import styles from './styles.module.scss'

interface Category {
    id: string
    name: string
}

export default function CategoriesList(){
    
    const router = useRouter()
    const [categories, setCategories] = useState<Category[]>([])
    const [buttonPressed, setButtonPressed] = useState(false)
    const [loading, setLoading] = useState(false)
    
    useEffect(() => initCategories(), [])

    function initCategories() {
        getCategories()
    }

    function handleRefreshCategories() {
        setButtonPressed(true)
        getCategories()
        setLoading(true)

        setTimeout(() => {
            setButtonPressed(false)
            setLoading(false)
            router.refresh()
            toast.success("Categories list updated!")
        }, 3000)
       
    };

    async function handleRemoveCategory(category_id: string){
        const token = getCookieClient()
        
        const response = await api.delete('/category', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                category_id: category_id
            }
        })
        .catch((error) => {
            console.log(error)
            toast.warning("Category cannot be deleted if there is any product registered")
            return
        })

        if(!response){
            return
        }

        toast.success("Category deleted successfully!")
        getCategories()
    }


    async function getCategories() {
        const token = getCookieClient()
        
        const response = await api.get('/category', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setCategories(response.data)
    }

    return(
        <main className={styles.container}>
            <Suspense fallback={<Loading />}>
                <section className={styles.containerSection}>
                    <h1>List Categories</h1>
                    <button
                        onClick={handleRefreshCategories}
                    >
                        <RefreshCcw size={24} className={buttonPressed ? styles.buttonPressed : ''}/>
                    </button>
                </section>

                {loading ? <Loading /> :
                    <>
                        <section 
                            className={styles.categorySection}
                        >
                            {categories.length > 0 ? 
                                categories.map(category  => (
                                    <section
                                        className={styles.item}
                                        key={category.id}
                                    >
                                        <h1>{category.name}</h1>
                                        <button
                                            onClick={() => handleRemoveCategory(category.id)}
                                        >
                                            < X size={24} color='var(--red-900)'/>
                                        </button>
                                    </section>
                                )) : 
                                <span className={styles.item}>
                                    No have categories
                                </span>
                            }
                        </section>
                    
                        <Link href="/dashboard/category" className={styles.createCategory}>
                            Create category
                        </Link>
                    </>
                }
            </Suspense>
        </main>
    )
}