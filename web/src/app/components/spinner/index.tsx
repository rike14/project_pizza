import styles from './styles.module.scss';

export default function Spinner() {
  return (
    <>
      <div className={styles.spinnerContainer}>
        <span className={styles.spinner}></span>
        <span className={styles.spinnerBackground}></span>
      </div>
    </>
  )
}