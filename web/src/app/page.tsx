"use client"
import Loading from '@/app/components/loading/loading'
import { api } from '@/services/app'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Suspense, useState } from 'react'
import styles from './page.module.scss'
import logoImg from '/public/logo.svg'
import { Button } from './dashboard/components/button'
import { createCookies } from '@/lib/createCookies'
import { toast } from 'sonner'
import { TriangleAlertIcon } from 'lucide-react'
import Spinner from './components/spinner'

export default function Home(){
  const [loading, setLoading] = useState(false)

  async function handleSignin(formData: FormData){
      const email = formData.get("email")
      const password = formData.get("password")

      if(email === "" || password === ""){
          return
      }

      try {
        const response = await api.post("/session", {
            email,
            password
        })

        if(!response.data.token){
          return;
        }

        await createCookies(response.data.token)
        toast.success(`Login successfully! Welcome ${response.data.name}`)

      } catch (error) {
        toast("Email or password wrong! Try again!", {
          icon: <TriangleAlertIcon />,
          style: {
            color: "var(--red-900)"
          }
        })
        return;
      }
      
      redirect("/dashboard")

  }

  function handleSignup(){
    setLoading(true)
  }

  return(
    <>
      <Suspense fallback={<Loading />}>
        <div className={styles.containerCenter}>
            <Image
                src={logoImg}
                alt="Logo image"
            />

            <section className={styles.login}>
              <form action={handleSignin}>
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
                  name='Login'
                />
              </form>

              <div>
                {loading ? <Spinner /> : 
                  <Link href="/signup" className={styles.text} onClick={handleSignup}>
                    Don't have an account? Signup
                  </Link>
                }
              </div>
            </section>
        </div>
      </Suspense>
    </>
  )
}