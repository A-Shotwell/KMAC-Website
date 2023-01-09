/*
    UNRESOLVED PROBLEM:    
    There is a strange problem happening with Chrome's autofill feature here.  If I fill fields with autofill 
    on the first submitted message, the state updates and it validates with no problem. If I try to fill those 
    fields with autofill for a second message, it will not update the state, and therefore does not validate. 
    However, if I autofill, then delete the value I just selected, then autofill AGAIN, it updates the state 
    just fine. I'm unsure how to fix this.

    LINE 253:
    No Contact Message warning was displaying black and shifted to the left without flag. Wrapped in ternary operator
    set to flag condition to correct this faulty display.
*/

import { useState, useEffect, useCallback } from 'react'
import styles from "./ContactAndBooking.module.css"
import axios from 'axios'

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
    const [typeContact, setTypeContact] = useState("contact")

    // Flag invalid form values for validation alerts
    const [validFlag, setValidFlag] = useState(true)

    // Successful message confirmation flag
    const [confirm, setConfirm] = useState(false)

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
    }, [])

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setValidFlag(true)
        if (validate()){
            // Trigger confirmation window
            setConfirm(true)
            if (typeContact === "contact"){
                // Axios request currently not hitting the backend
                try {
                    let result = await axios.post('http://localhost:4000/contact', contact)
                    console.log(result.response)

                    setContact({
                        name: null,
                        email: null,
                        phone: null,
                        reason: null,
                        message: null
                    })
                    document.getElementById('contactForm').reset()
                } catch (err) {
                    console.log(err.response)

                    setContact({
                        name: null,
                        email: null,
                        phone: null,
                        reason: null,
                        message: null
                    })
                    document.getElementById('contactForm').reset()
                }
            }
            else if (typeContact === "booking"){
                // Axios request currently not hitting the backend
                try {
                    let result = await axios.post('http://localhost:4000/booking', booking)
                    console.log(result.response)

                    setBooking({
                        name: null,
                        email: null,
                        phone: null,
                        date: null,
                        time: null,
                        description: null
                    })
                    document.getElementById('bookingForm').reset()

                    setBooking({
                        name: null,
                        email: null,
                        phone: null,
                        date: null,
                        time: null,
                        description: null
                    })
                    document.getElementById('bookingForm').reset()
                } catch (err){
                    console.log(err.response)
                }
            }
        }
        // set form validation alert flag on validation failure
        else {
            setValidFlag(false)
            setConfirm(false)
            console.log("SUBMISSION INVALID")
        }
    }

    // Contact form view
    const contactWindow = () => {
        return (
            <form id="contactForm" onSubmit={e => handleSubmit(e)}>
                <label className={styles.label} htmlFor="name">Name: </label>
                <input 
                    className={styles.input} 
                    name="name" 
                    type="text" 
                    onChange={e => setContact({...contact, name: e.target.value})} 
                />
                <span className={!validFlag && !contact.name ? styles.warning : styles.warningHidden}>Please enter your name.</span>
                <label className={styles.label} htmlFor="email">Email: </label>
                <input 
                    className={styles.input} 
                    name="email" 
                    type="email" 
                    onChange={e => setContact({...contact, email: e.target.value})} 
                />
                <span className={
                    !validFlag && (!contact.email || !contact.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))
                    ? styles.warning
                    : styles.warningHidden
                }>
                    Please enter a valid email address.
                </span>
                <label className={styles.label} htmlFor="phone">Phone: </label>
                <input 
                    className={styles.input} 
                    name="phone" 
                    type="text" 
                    onChange={e => setContact({...contact, phone: e.target.value})} 
                />
                <span className={
                    !validFlag && (!contact.phone || ![10,11].includes(contact.phone.split('-').join('').split('').length) || contact.phone.split('-').join('').split('').some(e => !'0123456789'.includes(e)))
                    ? styles.warning
                    : styles.warningHidden
                }>Please enter a valid phone number.</span>
                <select 
                    className={styles.select} 
                    onChange={e => setContact({...contact, reason: e.target.value})}
                    defaultValue="Reason for contact"
                >
                    <option className={styles.option} value="Reason for contact" disabled>Reason for contact</option>
                    <option className={styles.option} value="Business Inquiry">Business Inquiry</option>
                    <option className={styles.option} value="Ticket Sales">Ticket Sales</option>
                    <option className={styles.option} value="Other">Other</option>
                </select>
                <span className={!validFlag && !contact.reason ? styles.warning : styles.warningHidden}>Please select a reason for contact.</span>
                <textarea 
                    className={`${styles.textarea} ${styles.textareaContact}`} 
                    placeholder="How can I help you?" 
                    onChange={e => setContact({...contact, message: e.target.value})} 
                />
                {!validFlag && !contact.message ? <span className={!validFlag && !contact.message ? styles.warning : styles.warningHideen}>Please enter your message.</span> : null}
                <button className={`${styles.submit} ${styles.submitContact}`} role="submit">Submit</button>
            </form>
        )
    }

    // Booking form view
    const bookingWindow = () => {
        return (
            <form id="bookingForm" onSubmit={handleSubmit}>
                {confirm && <h1 style={{color: "white"}}>TRIGGER TEST</h1>}
                <label className={styles.label} htmlFor="name">Name: </label>
                <input 
                    className={styles.input} 
                    name="name" 
                    type="text" 
                    onChange={e => setBooking({...booking, name: e.target.value})} 
                />
                <span className={!validFlag && !booking.name ? styles.warning : styles.warningHidden}>Please enter your name.</span>
                <label className={styles.label} htmlFor="email">Email: </label>
                <input 
                    className={styles.input} 
                    name="email" 
                    type="email" 
                    onChange={e => setBooking({...booking, email: e.target.value})} 
                />
                <span className={
                    !validFlag && (!booking.email || !booking.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))
                    ? styles.warning
                    : styles.warningHidden
                }>
                    Please enter a valid email address.
                </span>
                <label className={styles.label} htmlFor="phone">Phone: </label>
                <input 
                    className={styles.input} 
                    name="phone" 
                    type="text" 
                    onChange={e => setBooking({...booking, phone: e.target.value})} 
                />
                <span className={
                    !validFlag && (!booking.phone || ![10,11].includes(booking.phone.split('-').join('').split('').length)|| booking.phone.split('-').join('').split('').some(e => !'0123456789'.includes(e)))
                    ? styles.warning
                    : styles.warningHidden
                }>
                    Please enter a valid phone number.
                </span>
                <label className={styles.label} htmlFor="date">Select Date: </label>
                <input
                    className={styles.datetime} 
                    type="date" 
                    name="date"
                    min={minDate}
                    onChange={e => setBooking({...booking, date: e.target.value})} 
                />
                <span className={!validFlag && !booking.date ? styles.warning : styles.warningHidden}>Please select a date for your event.</span>
                <label className={styles.label} htmlFor="time">Select Time: </label>
                <input
                    className={styles.datetime} 
                    type="time"
                    name="time"
                    onChange={e => setBooking({...booking, time: e.target.value})}
                />
                <span className={!validFlag && !booking.time ? styles.warning : styles.warningHidden}>Please select a time for your event.</span>
                <textarea 
                    className={`${styles.textarea} ${styles.textareaBooking}`} 
                    placeholder="Please give a brief description of your event." 
                    onChange={e => setBooking({...booking, description: e.target.value})} 
                />
                <span className={!validFlag && !booking.description ? styles.warning : styles.warningHidden}>Please describe your event.</span>
                <button className={`${styles.submit} ${styles.submitBooking}`} role="submit">Submit</button>
            </form>
        )
    }

    // Message confirmation window, triggered on successful validation and submission
    const confirmWindow = () => {
        return (
            <div className={styles.confirmContainer}>
                <h1 className={`${styles.confirmText} ${styles.confirmThankYou}`}>Thanks for the message!</h1>
                <h3 className={`${styles.confirmText} ${styles.confirmSubThankYou}`}>I'll get back to you ASAP.</h3>
                <button className={styles.confirmOkay} onClick={() => setConfirm(false)}>Okay</button>
            </div>
        )
    }

    return (
        <div className={styles.container} id="contact">
            {confirm && confirmWindow()}
            <button 
                role="button"
                className={`${styles.toggle} ${styles.toggleContact}`} 
                onClick={() => {
                    setTypeContact("contact")
                    setValidFlag(true)
                }}
            >
                CONTACT
            </button>
            <button 
                role="button"
                className={`${styles.toggle} ${styles.toggleBooking}`} 
                onClick={() => {
                    setTypeContact("booking")
                    setValidFlag(true)
                }}
            >
                BOOKING
            </button>
            <br />
            {typeContact === "contact" && contactWindow()}
            {typeContact === "booking" && bookingWindow()}
        </div>
    )
}

export default ContactAndBooking