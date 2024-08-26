"use client"
import { calculateTotalOrder } from '@/lib/helper'
import { OrderContext } from '@/providers/order'
import { X } from 'lucide-react'
import { use } from 'react'
import styles from './styles.module.scss'


export function ModalOrder(){
    const { onRequestClose, order, finishOrder } = use(OrderContext)

    async function handleFinishOrder() {
        await finishOrder(order[0].order.id)
    }
    
    return (
        <dialog 
            className={styles.dialogContainer}
        >
            <section 
                className={styles.dialogContent}
            >
                <button
                    className={styles.dialogBack}
                    onClick={onRequestClose}
                >
                    <X 
                        size={40} 
                        color='var(--red-900)'
                    />
                </button>

                <article
                    className={styles.article}
                >
                    <h2>Order details</h2>

                    <span
                        className={styles.table}
                    >
                        Table <b>{order[0].order.table}</b>
                    </span>

                    {order[0].order?.name && (
                        <span
                        className={styles.name}
                        >
                            Name: <b>{order[0].order.name}</b>
                        </span>
                    )}

                    {order.map( item => (
                         <section
                            key={item.id}
                            className={styles.item}
                        >
                            <span>Qnt: {item.amount} - <b>{item.product.name}</b> - $ {parseFloat(item.product.price)}</span>
                            <span
                                className={styles.description}
                                >
                                {item.product.description}
                            </span>
                            <span>Total product - <b>$ {parseFloat(item.product.price) * item.amount}</b></span>
                         </section>
                    ))}

                    <h3
                        className={styles.totalOrder}
                    >
                        Total order: $ {calculateTotalOrder(order)}
                    </h3>

                    <button
                        className={styles.buttonOrder}
                        onClick={handleFinishOrder}
                    >
                        Finish order
                    </button>

                </article>
            </section>
        </dialog>
    )
}