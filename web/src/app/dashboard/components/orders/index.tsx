"use client"
import { OrderProps } from '@/lib/order.type';
import { OrderContext } from '@/providers/order';
import { RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';
import { toast } from 'sonner';
import { ModalOrder } from '../modal';
import styles from './styles.module.scss';
import Loading from '@/app/components/loading/loading';


interface Props {
    orders: OrderProps[]
}

export default function Orders({ orders }: Props){
    const router = useRouter()
    const {isOpen, onRequestOpen} = use(OrderContext)
    const [buttonPressed, setButtonPressed] = useState(false)

    function handleRefreshOrders() {
       setButtonPressed(true)

        setTimeout(() => {
           setButtonPressed(false)
            router.refresh()
            toast.success("Orders updated!")
        }, 3000)
       
    };

    async function handleDetailOrder(order_id: string) {
       await onRequestOpen(order_id)
    }

    return(
        <>
            <main className={styles.container}>
                <section className={styles.containerSection}>
                    <h1>Orders</h1>
                    <button
                        onClick={handleRefreshOrders}
                    >
                        <RefreshCcw size={24} className={buttonPressed ? styles.buttonPressed : styles.buttonNotPressed}/>
                    </button>
                </section>
                {buttonPressed ? 
                    <Loading /> :
                
                    <section className={styles.listOrders}>
                        {orders.length > 0 ? orders.map( order => (
                            <button
                                key={order.id} 
                                className={styles.orderItem}
                                onClick={() => handleDetailOrder(order.id)}
                            >
                                <div className={styles.tag}></div>
                                <span>Table {order.table}</span>
                            </button>
                        )) :
                        <span
                            className={styles.orderItem}
                        >
                            <div className={styles.tag}></div>
                            <span>No open orders...</span>
                        </span>
                        }  
                    </section>
                }
            </main>

            {isOpen && <ModalOrder />}
        </>
    )
}