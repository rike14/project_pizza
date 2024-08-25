"use client"
import { OrderProps } from '@/lib/order.type';
import { RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { ModalOrder } from '../modal';
import styles from './styles.module.scss';


interface Props {
    orders: OrderProps[]
}

export default function Orders({ orders }: Props){
    const [buttonPressed, setButtonPressed] = useState(false)
    const handleButtonPressed = () => {
       setButtonPressed(true)
       setTimeout(() => setButtonPressed(false), 2500)
    };

    return(
        <>
            <main className={styles.container}>
                <section className={styles.containerSection}>
                    <h1>Orders</h1>
                    <button
                        onClick={handleButtonPressed}
                    >
                        <RefreshCcw size={24} className={buttonPressed ? styles.buttonPressed : styles.buttonNotPressed}/>
                    </button>
                </section>

                <section className={styles.listOrders}>
                    {orders.length > 0 ? orders.map( order => (
                        <button
                        key={order.id} 
                        className={styles.orderItem}
                        >
                            <div className={styles.tag}></div>
                            <span>Table {order.table}</span>
                        </button>
                    )) :
                    <span
                    className={styles.orderItem}
                    >
                                <div className={styles.tag}></div>
                                <span>No open tables</span>
                        </span>
                    }  
                </section>
            </main>
            <ModalOrder 
                
            />
        </>
    )
}