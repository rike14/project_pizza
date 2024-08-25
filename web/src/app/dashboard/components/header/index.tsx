"use client"
import Loading from '@/app/components/loading/loading'
import { deleteCookie } from 'cookies-next'
import { LogOutIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Suspense, useState } from 'react'
import { toast } from 'sonner'
import styles from './styles.module.scss'
import logoImg from '/public/logo.svg'

export function Header(){
    const router = useRouter()
    const [loading, useLoading] = useState(false)

    async function handleLogout (){
        useLoading(true)

        deleteCookie("session", { path: "/"})
        toast.success("Logout successfully!")
        router.replace("/")
    }

    return(
        <Suspense fallback={<Loading />}>
            <header className={styles.headerContainer}>
                <div className={styles.headerContent}>
                    <Link href="/dashboard">
                        <Image
                            alt="Logo image"
                            src={logoImg}
                            width={190}
                            height={60}
                            priority={true}
                            quality={100}
                        />
                    </Link>

                    <nav>
                        <Link href="/dashboard/category">
                            Categories
                        </Link>
                        <Link href="/dashboard/product">
                            Products
                        </Link>

                        <form action={handleLogout}>
                            <button type='submit'>
                                <LogOutIcon 
                                    size={24}
                                />
                            </button>
                        </form>
                    </nav>


                </div>
            </header>
        </Suspense>
    )
}