"use client"
import Loading from '@/app/components/loading/loading'
import { getCookieClient } from '@/lib/cookieClient'
import { api } from '@/services/app'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { RefreshCcw, TriangleAlertIcon, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { toast } from 'sonner'
import styles from './styles.module.scss'

interface User {
    id: string
    name: string
    email: string
}

export default function UsersList(){
    
    const router = useRouter()
    const [users, setUsers] = useState<User[]>([])
    const [buttonPressed, setButtonPressed] = useState(false)
    const [loading, setLoading] = useState(false)
    
    useEffect(() => initUsers(), [])

    function initUsers() {
        getUsers()
    }

    function handleRefreshusers() {
        setButtonPressed(true)
        getUsers()
        setLoading(true)

        setTimeout(() => {
            setButtonPressed(false)
            setLoading(false)
            router.refresh()
            toast.success("Users list updated!")
        }, 3000)
       
    };

    async function handleRemoveUser(user_id: string){
        const token = getCookieClient()
        
        const response = await api.delete('/users', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                id: user_id
            }
        })
        .catch((error) => {
            console.log(error)
            toast("User cannot be deleted", {
                icon: <TriangleAlertIcon />,
                style: {
                    color: "var(--warning)"
                }
            })
            return
        })

        if(!response){
            return
        }

        toast.success("User deleted successfully!")
        getUsers()
    }


    async function getUsers() {
        const token = getCookieClient()
        
        const response = await api.get('/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setUsers(response.data)
    }

    return(
        <main className={styles.container}>
            <Suspense fallback={<Loading />}>
                <section className={styles.containerSection}>
                    <h1>List users</h1>
                    <button
                        onClick={handleRefreshusers}
                    >
                        <RefreshCcw size={24} className={buttonPressed ? styles.buttonPressed : ''}/>
                    </button>
                </section>

                {loading ? <Loading /> :
                    <>
                        <section 
                            className={styles.userSection}
                        >
                            {users.length > 0 ? 
                                 <Table className={styles.table}>
                                    <TableHeader className={styles.tableHeader}>
                                        <TableColumn className={styles.tableColumn}>Name</TableColumn>
                                        <TableColumn className={styles.tableColumn}>Email</TableColumn>
                                        <TableColumn className={styles.tableColumn}>Actions</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {users.map(user  => (
                                            <TableRow 
                                                key={user.id}
                                                className={styles.item}
                                            >   
                                                <TableCell className={styles.tableRow}>{user.name}</TableCell>
                                                <TableCell className={styles.tableRow}>{user.email}</TableCell>
                                                <TableCell className={styles.tableRow}> 
                                                    <button
                                                        onClick={() => handleRemoveUser(user.id)}
                                                        className={styles.buttonRemoveItem}
                                                    >
                                                        < X size={24} color='var(--red-900)'/>
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                 : 
                                <span className={styles.noUser}>
                                    No have users
                                </span>
                            }
                        </section>
                    
                        <Link href="/dashboard/user" className={styles.createUser}>
                            Create user
                        </Link>
                    </>
                }
            </Suspense>
        </main>
    )
}