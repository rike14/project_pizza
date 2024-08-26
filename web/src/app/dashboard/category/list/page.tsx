"use client"
import Loading from '@/app/components/loading/loading'
import { Button } from '@/app/dashboard/components/button'
import { getCookieServer } from '@/lib/cookieServer'
import { api } from '@/services/app'
import { redirect, useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { getCookieClient } from '@/lib/cookieClient'
import Link from 'next/link'
import { toast } from 'sonner'
import { RefreshCcw, X } from 'lucide-react'

interface Category {
    id: string
    name: string
}

export default function CategoriesList(){
    
    const router = useRouter()
    const [categories, setCategories] = useState<Category[]>([])
    const [buttonPressed, setButtonPressed] = useState(false)
    
    useEffect(() => handleRefreshCategories(), [])

    function handleRefreshCategories() {
       setButtonPressed(true)
       getCategories()

        setTimeout(() => {
           setButtonPressed(false)
            router.refresh()
            toast.success("Categories list updated!")
        }, 3000)
       
    };


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
                        <RefreshCcw size={24} className={buttonPressed ? styles.buttonPressed : styles.buttonNotPressed}/>
                    </button>
                </section>

                <section 
                    className={styles.categoryItem}
                >
                    {categories.length > 0 ? 
                    categories.map(category  => (
                        <>
                            <h1>{category.name}</h1>
                            < X size={24} color='var(--red-900)'/>
                        </>
                    )) : 
                    <span>
                        No have categories
                    </span>
                }

                </section>
                
                 <section className={styles.createCategory}>
                    <Link href="/dashboard/category">
                        Create category
                    </Link>
                </section>
            </Suspense>
        </main>
    )
}