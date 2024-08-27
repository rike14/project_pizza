"use client"
import Loading from '@/app/components/loading/loading'
import { Button } from '@/app/dashboard/components/button'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { toast } from 'sonner'
import CreateCategory from './components/form'
import styles from './styles.module.scss'

export default function Category(){
    const router = useRouter()

    async function handleRegisterCategory(formData: FormData) {

        const response = await CreateCategory(formData)

        if(!response){
            toast.warning("Category already exists")
            return;
        }
        
        toast.success("Category created successfully!")
        router.replace("/dashboard/category/list")
    }

    return(
        <main className={styles.container}>
            <Suspense fallback={<Loading />}>
                <h1>New Category</h1>
                <form
                    action={handleRegisterCategory}
                    className={styles.form}
                    >
                    <input 
                        type='text'
                        name='name'
                        placeholder='Category name, ex: Pizza'
                        required
                        className={styles.input}
                        />

                    <Button 
                        name='Create category'
                    />

                </form>
            </Suspense>
        </main>
    )
}