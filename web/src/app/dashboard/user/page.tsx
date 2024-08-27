"use client"
import Loading from '@/app/components/loading/loading'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { toast } from 'sonner'
import { Button } from '../components/button'
import CreateUser from './components/form'
import styles from './styles.module.scss'

export default function Category(){
    const router = useRouter()

    async function handleRegisterUser(formData: FormData) {

        const response = await CreateUser(formData)

        if(!response){
            toast.warning("User already exists")
            return;
        }
        
        toast.success("User created successfully!")
        router.replace("/dashboard/user/list")
    }

    return(
        <main className={styles.container}>
            <Suspense fallback={<Loading />}>
                <h1>New User</h1>
                <form 
                    action={handleRegisterUser}
                    className={styles.form}
                >
                    <input 
                        type='text'
                        required
                        name='name'
                        placeholder='Write your name'
                        className={styles.input}
                    />

                    <input 
                        type='email'
                        required
                        name='email'
                        placeholder='Write your email'
                        className={styles.input}
                    />

                    <input 
                        type='password'
                        required
                        name='password'
                        placeholder='***********'
                        className={styles.input}
                    />

                    <Button
                        name='Create user'
                    />
                </form>
            </Suspense>
        </main>
    )
}