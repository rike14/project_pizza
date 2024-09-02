"use client"
import Loading from '@/app/components/loading/loading'
import { deleteCookie } from 'cookies-next'
import { LogOutIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Suspense, useState, useTransition } from 'react'
import { toast } from 'sonner'
import styles from './styles.module.scss'
import logoImg from '/public/logo.svg'
import Spinner from '@/app/components/spinner'

export function Header(){
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [routeName, setRouteName] = useState('')
    const [isPending, startTransition] = useTransition()

    function handleNavigate(route: string) {
        setRouteName(route)
        startTransition(() => {
            router.push(route)
        })
    }

    async function handleLogout (){
        setLoading(true)

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
                        <Link href="/dashboard/user/list" onClick={() => handleNavigate('user/list')}>
                            {isPending && routeName == 'user/list' ? <Spinner /> : <p>Users</p>}
                        </Link>
                        <Link href="/dashboard/category/list" onClick={() => handleNavigate('category/list')}>
                            {isPending && routeName == 'category/list' ? <Spinner /> : <p>Categories</p>}
                        </Link>
                        <Link href="/dashboard/product/list" onClick={() => handleNavigate('product/list')}>
                            {isPending && routeName == 'product/list' ? <Spinner /> : <p>Products</p>}
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