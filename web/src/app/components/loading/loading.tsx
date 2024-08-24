import styles from './styles.module.scss';

export default function Loading() {
  return (
    <>
      <div className={styles.spinnerContainer}>
        <span className={styles.spinner}></span>
        <span className={styles.spinnerBackground}></span>
      </div>
      <div className={styles.loader}>
        <div className={styles.flipping}>
            <div className={styles.card}>L</div>
            <div className={styles.card}>o</div>
            <div className={styles.card}>a</div>
            <div className={styles.card}>d</div>
            <div className={styles.card}>i</div>
            <div className={styles.card}>n</div>
            <div className={styles.card}>g</div>
            <div className={styles.card}>...</div>
        </div>
    </div>
    </>
  )
}