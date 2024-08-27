"use client"
import Loading from '@/app/components/loading/loading'
import { getCookieClient } from '@/lib/cookieClient'
import { api } from '@/services/app'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { RefreshCcw, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { toast } from 'sonner'
import styles from './styles.module.scss'

interface Product {
    id: string
    name: string
    banner: string
    description: string
    category: {
        name: string
    }
}

export default function ProductsList(){
    const router = useRouter()
    const [products, setProducts] = useState<Product[]>([])
    const [buttonPressed, setButtonPressed] = useState(false)
    const [loading, setLoading] = useState(false)
    
    useEffect(() => initProducts(), [])

    function initProducts() {
        getProducts()
    }

    function handleRefreshProducts() {
        setButtonPressed(true)
        getProducts()
        setLoading(true)

        setTimeout(() => {
            setButtonPressed(false)
            setLoading(false)
            router.refresh()
            toast.success("Products list updated!")
        }, 3000)
       
    };

    async function handleRemoveProducts(product_id: string){
        const token = getCookieClient()
        
        const response = await api.delete('/product', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                product_id: product_id
            }
        })
        .catch((error) => {
            console.log(error)
            toast.warning("Product cannot be deleted if there is any order open with it")
            return
        })

        if(!response){
            return
        }

        toast.warning("Product deleted successfully!")
        getProducts()
    }


    async function getProducts() {
        const token = getCookieClient()
        
        const response = await api.get('/product', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setProducts(response.data)
    }

    return(
        <main className={styles.container}>
            <Suspense fallback={<Loading />}>
                <section className={styles.containerSection}>
                    <h1>List Products</h1>
                    <button
                        onClick={handleRefreshProducts}
                    >
                        <RefreshCcw size={24} className={buttonPressed ? styles.buttonPressed : ''}/>
                    </button>
                </section>

                {loading ? <Loading /> :
                    <>
                        <section 
                            className={styles.productSection}
                        >
                            {products.length > 0 ? 
                                <Table className={styles.table}>
                                    <TableHeader className={styles.tableHeader}>
                                        <TableColumn className={styles.tableColumn}>Image</TableColumn>
                                        <TableColumn className={styles.tableColumn}>Name</TableColumn>
                                        <TableColumn className={styles.tableColumn}>Category</TableColumn>
                                        <TableColumn className={styles.tableColumn}>Actions</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {products.map(product  => (
                                            <TableRow 
                                                key={product.id}
                                                className={styles.item}
                                            >   

                                                <TableCell className={styles.tableRow}> 
                                                    <Image 
                                                        alt='Product preview'
                                                        src={api.getUri() + `/files/${product.banner}`}
                                                        className={styles.preview}
                                                        fill={true}
                                                        quality={100}
                                                        priority={true}
                                                    />
                                                </TableCell>
                                                <TableCell className={styles.tableRow}>{product.name}</TableCell>
                                                <TableCell className={styles.tableRow}>{product.category.name}</TableCell>
                                                <TableCell className={styles.tableRow}> 
                                                    <button
                                                        onClick={() => handleRemoveProducts(product.id)}
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
                                <span className={styles.noProduct}>
                                    No have products
                                </span>
                            }
                        </section>
                    
                        <Link href="/dashboard/product" className={styles.createProduct}>
                            Create product
                        </Link>
                    </>
                }
            </Suspense>
        </main>
    )
}