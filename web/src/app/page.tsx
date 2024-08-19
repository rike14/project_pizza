import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.scss'
import logoImg from '/public/logo.svg'

export default function Home(){
  return(
    <>
      <div className={styles.containerCenter}>
          <Image
              src={logoImg}
              alt="Logo image"
          />

          <section className={styles.login}>
            <form>
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
    </>
  )
}