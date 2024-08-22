import { RefreshCcw } from 'lucide-react'
import styles from './styles.module.scss'

export default function Orders(){
    return(
        <main className={styles.container}>
            <section className={styles.containerSection}>
                <h1>Orders</h1>
                <button>
                    <RefreshCcw size={24} />
                </button>
            </section>

            <section className={styles.listOrders}>
                <button className={styles.orderItem}>
                    <div className={styles.tag}></div>
                    <span>Mesa 10</span>
                </button>
            </section>
        </main>
    )
}