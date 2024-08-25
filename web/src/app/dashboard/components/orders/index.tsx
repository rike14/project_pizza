"use client"
import { RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import styles from './styles.module.scss';

export default function Orders(){
    const [buttonPressed, setButtonPressed] = useState(false)
    const handleButtonPressed = () => {
       setButtonPressed(true)
       setTimeout(() => setButtonPressed(false), 2500)
    };

    return(
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
                <button className={styles.orderItem}>
                    <div className={styles.tag}></div>
                    <span>Mesa 10</span>
                </button>
            </section>
        </main>
    )
}