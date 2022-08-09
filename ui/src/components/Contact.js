import styles from './Contact.module.css'
import ContactAndBooking from './ContactAndBooking.js'

const Contact = () => {
    return (
        <div className={styles.main}>
          <h1 className={styles.banner}>REACH OUT.</h1>
          <div className={styles.socialContainer}>
            <div className={styles.listContainer}>
                <div className={`${styles.listItem} ${styles.spotify}`}>
                    <a className={styles.link} href="#" />
                </div>
                <div className={`${styles.listItem} ${styles.facebook}`}>
                    <a className={styles.link} href="#" />
                </div>
                <div className={`${styles.listItem} ${styles.instagram}`}>
                    <a className={styles.link} href="#" />
                </div>
                <div className={`${styles.listItem} ${styles.twitter}`}>
                    <a className={styles.link} href="#" />
                </div>
            </div>
          </div>
          <ContactAndBooking />
        </div>
    )
}

export default Contact