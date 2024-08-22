import styles from './styles.module.scss';

export default function Loading() {
  return (
    <>
      <div className={styles.skeletonContainer}>
        <p className={styles.skeleton}>Loading...</p>
      </div>
    </>
  )
}