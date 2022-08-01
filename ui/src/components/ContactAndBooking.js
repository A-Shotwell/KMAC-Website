import { useState, useEffect } from 'react'
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
    const [minDate, setMinDate] = useState()
    const [typeContact, setTypeContact] = useState("booking")
    // const [valid, setValid] = useState(true)

    useEffect(()=> {
        let today = new Date
        let dd = today.getDate()
        let mm = today.getMonth() + 1
        let yyyy = today.getFullYear()

        if (dd < 10)
            dd = '0' + dd
        if (mm < 10)
            mm = '0' + mm

        today = yyyy + '-' + mm + '-' + dd
        setMinDate(today)
    })

    const validate = () => {
        let isValid = true

        if (typeContact === "contact"){
            if (!contact.name){
                isValid = false
            }
            if (!contact.email || !contact.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
                isValid = false
            }
            if (![10,11].includes(contact.phone.split('-').join('').split('').length)){
                isValid = false
            }
            if (!contact.reason){
                isValid = false
            }
            if (!contact.message){
                isValid = false
            }
        }
        else if (typeContact === "booking"){
            if (!booking.name){
                isValid = false
            }
            if (!booking.email || !booking.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
                isValid = false
            }
            if (![10,11].includes(booking.phone.split('-').join('').split('').length)){
                isValid = false
            }
            if (!booking.date){
                isValid = false
            }
            if (!booking.time){
                isValid = false
            }
            if (!booking.description){
                isValid = false
            }
        }

        return isValid
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()){
            if (typeContact === "contact"){
                console.log(contact)
            }
            else if (typeContact === "booking"){
                console.log(booking)
            }
        }
        else {
            console.log("INVALID")
        }
    }

    const contactWindow = () => {
        return (
            <form onSubmit={e => handleSubmit(e)}>
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
                    onChange={e => setContact({...contact, phone: e.target.value})} 
                />
                <select 
                    className={styles.select} 
                    onChange={e => setContact({...contact, reason: e.target.value})}
                    value="Reason for contact"
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
                    onChange={e => setBooking({...booking, phone: e.target.value})} 
                />
                <label className={styles.label} htmlFor="date">Select Date: </label>
                <input 
                    type="date" 
                    name="date"
                    min={minDate}
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
                    onChange={e => setBooking({...booking, description: e.target.value})} 
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