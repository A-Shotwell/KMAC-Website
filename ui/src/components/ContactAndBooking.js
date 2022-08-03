import { useState, useEffect } from 'react'
import styles from "./ContactAndBooking.module.css"

const ContactAndBooking = () => {
    // Contact form values
    const [contact, setContact] = useState({
        name: null,
        email: null,
        phone: null,
        reason: null,
        message: null
    })

    // Booking form values
    const [booking, setBooking] = useState({
        name: null,
        email: null,
        phone: null,
        date: null,
        time: null,
        description: null
    })

    // Store today's date, calendar selection minimum
    const [minDate, setMinDate] = useState()

    // Display contact form or booking form, switch on button press
    const [typeContact, setTypeContact] = useState("booking")

    // Flag invalid form values for validation alerts
    const [validFlag, setValidFlag] = useState(true)

    // Keep track of today's date, booking calendar selection minimum
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

    // Validate form values
    const validate = () => {
        // Track and return form validity, switch to false if any field fails
        let isValid = true

        // Check validity of contact form values
        if (typeContact === "contact"){
            // If no name, trigger invalid flag
            if (!contact.name){
                isValid = false
            }
            // If no email or email does not match regex, trigger invalid flag
            if (!contact.email || !contact.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
                isValid = false
            }
            // If phone number length is neither 10 nor 11 digits long, trigger invalid flag
            if (!contact.phone || ![10,11].includes(contact.phone.split('-').join('').split('').length) || contact.phone.split('-').join('').split('').some(e => !'0123456789'.includes(e))){
                isValid = false
            }
            // If no reason for contact is given, trigger invalid flag
            if (!contact.reason){
                isValid = false
            }
            // If message field is blank, trigger invalid flag
            if (!contact.message){
                isValid = false
            }
        }
        // Check validity of booking form values
        else if (typeContact === "booking"){
            // If no name, trigger invalid flag
            if (!booking.name){
                isValid = false
            }
            // If no email or email does not match regex, trigger invalid flag
            if (!booking.email || !booking.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
                isValid = false
            }
            // If phone number length is neither 10 nor 11 digits long, trigger invalid flag
            if (!booking.phone || ![10,11].includes(booking.phone.split('-').join('').split('').length)|| booking.phone.split('-').join('').split('').some(e => !'0123456789'.includes(e))){
                isValid = false
            }
            // If no booking date is selected, trigger invalid flag
            if (!booking.date){
                isValid = false
            }
            // If no booking time is selected, trigger invalid flag
            if (!booking.time){
                isValid = false
            }
            // If no booking description is given, trigger invalid flag
            if (!booking.description){
                isValid = false
            }
        }

        // set form validation alert flag on validation failure
        !isValid ? setValidFlag(false) : setValidFlag(true)

        return isValid
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setValidFlag(true)
        if (validate()){
            if (typeContact === "contact"){
                console.log(contact)
            }
            else if (typeContact === "booking"){
                console.log(booking)
            }
        }
        // set form validation alert flag on validation failure
        else {
            setValidFlag(false)
            console.log("INVALID")
        }
    }

    // Contact form view
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
                {!validFlag && !contact.name && <span>Please enter your name.</span>}
                <label className={styles.label} htmlFor="email">Email: </label>
                <input 
                    className={styles.input} 
                    name="email" 
                    type="email" 
                    onChange={e => setContact({...contact, email: e.target.value})} 
                />
                {!validFlag && (!contact.email || !contact.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) && <span>Please enter a valid email address.</span>}
                <label className={styles.label} htmlFor="phone">Phone: </label>
                <input 
                    className={styles.input} 
                    name="phone" 
                    type="text" 
                    onChange={e => setContact({...contact, phone: e.target.value})} 
                />
                {!validFlag && (!contact.phone || ![10,11].includes(contact.phone.split('-').join('').split('').length) || contact.phone.split('-').join('').split('').some(e => !'0123456789'.includes(e))) && <span>Please enter a valid phone number.</span>}
                <select 
                    className={styles.select} 
                    onChange={e => setContact({...contact, reason: e.target.value})}
                    value="Reason for contact"
                >
                    <option className={styles.option} value="Reason for contact" disabled>Reason for contact</option>
                    <option className={styles.option} value="Business Inquiry">Business Inquiry</option>
                    <option className={styles.option} value="Other">Other</option>
                </select>
                {!validFlag && !contact.reason && <span>Please select a reason for contact.</span>}
                <textarea 
                    className={styles.textarea} 
                    placeholder="How can I help you?" 
                    onChange={e => setContact({...contact, message: e.target.value})} 
                />
                {!validFlag && !contact.message && <span>Please enter your message.</span>}
                <button role="submit">Submit</button>
            </form>
        )
    }

    // Booking form view
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
                {!validFlag && !booking.name && <span>Please enter your name.</span>}
                <label className={styles.label} htmlFor="email">Email: </label>
                <input 
                    className={styles.input} 
                    name="email" 
                    type="email" 
                    onChange={e => setBooking({...booking, email: e.target.value})} 
                />
                {!validFlag && (!booking.email || !booking.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) && <span>Please enter a valid email address.</span>}
                <label className={styles.label} htmlFor="phone">Phone: </label>
                <input 
                    className={styles.input} 
                    name="phone" 
                    type="text" 
                    onChange={e => setBooking({...booking, phone: e.target.value})} 
                />
                {!validFlag && (!booking.phone || ![10,11].includes(booking.phone.split('-').join('').split('').length)|| booking.phone.split('-').join('').split('').some(e => !'0123456789'.includes(e))) && <span>Please enter a valid phone number.</span>}
                <label className={styles.label} htmlFor="date">Select Date: </label>
                <input 
                    type="date" 
                    name="date"
                    min={minDate}
                    onChange={e => setBooking({...booking, date: e.target.value})} 
                />
                {!validFlag && !booking.date && <span>Please select a date for your event.</span>}
                <label className={styles.label} htmlFor="time">Select Time: </label>
                <input 
                    type="time"
                    name="time"
                    onChange={e => setBooking({...booking, time: e.target.value})}
                />
                {!validFlag && !booking.time && <span>Please select a time for your event.</span>}
                <textarea 
                    className={styles.textarea} 
                    placeholder="Please give a brief description of your event." 
                    onChange={e => setBooking({...booking, description: e.target.value})} 
                />
                {!validFlag && !booking.description && <span>Please describe your event.</span>}
                <button role="submit">Submit</button>
            </form>
        )
    }

    return (
        <div>
            <button 
                role="button" 
                onClick={() => {
                    setTypeContact("contact")
                    setValidFlag(true)
                }}
            >
                Contact
            </button>
            <button 
                role="button" 
                onClick={() => {
                    setTypeContact("booking")
                    setValidFlag(true)
                }}
            >
                Booking
            </button>
            <br />
            {typeContact === "contact" && contactWindow()}
            {typeContact === "booking" && bookingWindow()}
        </div>
    )
}

export default ContactAndBooking