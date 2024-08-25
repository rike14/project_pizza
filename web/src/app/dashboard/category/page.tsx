import Loading from '@/app/components/loading/loading'
import { Button } from '@/app/dashboard/components/button'
import { getCookieServer } from '@/lib/cookieServer'
import { api } from '@/services/app'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import styles from './styles.module.scss'

export default function Category(){

    async function handleRegisterCategory(formData: FormData) {
        "use server"

        const name = formData.get("name")

        if(name === ""){
            return;
        }

        const data = {
            name: name
        }

        const token = getCookieServer()

        await api.post("category", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            })
            .catch((error) => {
                console.log(error)
                return;
            })  
        
        redirect("/dashboard")
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