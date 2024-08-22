import Loading from '@/app/components/loading/loading'
import { api } from '@/services/app'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import styles from './page.module.scss'
import logoImg from '/public/logo.svg'

export default function Home(){

  async function handleSignin(formData: FormData){
      "use server"


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

          const expressTime = 60 * 60 * 24 * 30 * 1000 // 30 days
          cookies().set("session", response.data.token), {
            maxAge: expressTime,
            path: '/',
            httpOnly: false,
            secure: process.env.NODE_ENV === "production"
          }

      } catch (error) {
          console.log(error)
          return;
      }

      redirect("/dashboard")
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

                <button type='submit'>
                  Login
                </button>
              </form>

              <Link href="/signup" className={styles.text}>
                Don't have an account? Signup
              </Link>
            </section>
        </div>
      </Suspense>
    </>
  )
}