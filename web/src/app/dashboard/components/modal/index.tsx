import { X } from 'lucide-react'
import styles from './styles.module.scss'

export function ModalOrder(){
    return (
        <dialog 
            className={styles.dialogContainer}
        >
            <section 
                className={styles.dialogContent}
            >
                <button
                    className={styles.dialogBack}
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
                        Table <b>36</b>
                    </span>

                    <section
                        className={styles.item}
                    >
                        <span>1 - <b>Coca Cola lata</b></span>
                        <span
                            className={styles.description}
                        >
                            Rewfrigerante coca cola 350ml 
                        </span>
                    </section>

                    <button
                        className={styles.buttonOrder}
                    >
                        Finish order
                    </button>

                </article>
            </section>
        </dialog>
    )
}