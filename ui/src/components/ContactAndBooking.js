import { useState } from 'react'
import styles from "./ContactAndBooking.module.css"

const ContactAndBooking = () => {
    const [contact, setContact] = useState({
        name: null,
        email: null,
        phone: null,
        reason: null,
        message: null
    })
    const [booking, setBooking] = useState({
        name: null,
        email: null,
        phone: null,
        date: null,
        time: null,
        description: null
    })
    const [typeContact, setTypeContact] = useState("booking")
    const [valid, setValid] = useState(true)

    const handleSubmit = () => {

    }

    const contactWindow = () => {
        return (
            <form onSubmit={handleSubmit}>
                <label className={styles.label} htmlFor="name">Name: </label>
                <input 
                    className={styles.input} 
                    name="name" 
                    type="text" 
                    onChange={e => setContact({...contact, name: e.target.value})} 
                />
                <label className={styles.label} htmlFor="email">Email: </label>
                <input 
                    className={styles.input} 
                    name="email" 
                    type="email" 
                    onChange={e => setContact({...contact, email: e.target.value})} 
                />
                <label className={styles.label} htmlFor="phone">Phone: </label>
                <input 
                    className={styles.input} 
                    name="phone" 
                    type="text" 
                    onChange={e => setContact({...contact, name: e.target.value})} 
                />
                <select 
                    className={styles.select} 
                    onChange={e => setContact({...contact, reason: e.target.value})}
                >
                    <option className={styles.option} value="Reason for contact" disabled>Reason for contact</option>
                    <option className={styles.option} value="Business Inquiry">Business Inquiry</option>
                    <option className={styles.option} value="Other">Other</option>
                </select>
                <textarea 
                    className={styles.textarea} 
                    placeholder="How can I help you?" 
                    onChange={e => setContact({...contact, message: e.target.value})} 
                />
                <button role="submit">Submit</button>
            </form>
        )
    }

    const bookingWindow = () => {
        return (
            <form onSubmit={handleSubmit}>
                <label className={styles.label} htmlFor="name">Name: </label>
                <input 
                    className={styles.input} 
                    name="name" 
                    type="text" 
                    onChange={e => setBooking({...booking, name: e.target.value})} 
                />
                <label className={styles.label} htmlFor="email">Email: </label>
                <input 
                    className={styles.input} 
                    name="email" 
                    type="email" 
                    onChange={e => setBooking({...booking, email: e.target.value})} 
                />
                <label className={styles.label} htmlFor="phone">Phone: </label>
                <input 
                    className={styles.input} 
                    name="phone" 
                    type="text" 
                    onChange={e => setBooking({...booking, name: e.target.value})} 
                />
                <label className={styles.label} htmlFor="date">Select Date: </label>
                <input 
                    type="date" 
                    name="date" 
                    onChange={e => setBooking({...booking, date: e.target.value})} 
                />
                <label className={styles.label} htmlFor="time">Select Time: </label>
                <input 
                    type="time"
                    name="time"
                    onChange={e => setBooking({...booking, time: e.target.value})}
                />
                <textarea 
                    className={styles.textarea} 
                    placeholder="Please describe your event." 
                    onChange={e => setContact({...contact, description: e.target.value})} 
                />
                <button role="submit">Submit</button>
            </form>
        )
    }

    return (
        <div>
            <button role="button" onClick={() => setTypeContact("contact")}>Contact</button>
            <button role="button" onClick={() => setTypeContact("booking")}>Booking</button>
            <br />
            {typeContact === "contact" && contactWindow()}
            {typeContact === "booking" && bookingWindow()}
        </div>
    )
}

export default ContactAndBooking