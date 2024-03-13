import styles from './Contact.module.css'
import ContactAndBooking from './ContactAndBooking.js'
import Social from './Social.js'

const Contact = () => {
    return (
        <div className={styles.main} id="contact">
          <Social />
          <ContactAndBooking />
        </div>
    )
}

export default Contact