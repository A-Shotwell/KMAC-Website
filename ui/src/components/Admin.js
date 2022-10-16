import { useState } from 'react'
import styles from './Admin.module.css'
import axios from 'axios'
import FormData from 'form-data'

const Admin = () => {
    const [formValues, setFormValues] = useState({
        eventTitle: null,
        location: null,
        date: null,
        time: null,
        ticket: null,
        desc: null,
        image: null
    })

    // REQUEST IS NOT MAKING IT TO THE SERVER
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        
        Array.from(document.getElementById("form").elements).forEach(element => {
            switch (element.name){
                case "image":
                    formData.append(`${element.name}`, element.files)
                    break
                case "submit":
                    break
                default:
                    formData.append(`${element.name}`, element.value)
            }
        })

        console.log([...formData])

        try {
            const response = axios.post('http://localhost:4000/uploadShow', formData)
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <div className={styles.main}>
                <div className={styles.titleContainer}>
                    <h1>KMAC ADMIN</h1>
                </div>                
                <div className={styles.formWindow}>
                    <div className={styles.newShowHeader}>
                        <h1>New Show</h1>
                        <form className={styles.showForm} id="form" onSubmit={e => handleSubmit(e)}>
                            <label htmlFor="eventTitle">Event Title: </label>
                            <input className={styles.fieldInput} type="text" name="eventTitle" onChange={e => setFormValues({...formValues, eventTitle: e.target.value})}/>
                            <br />
                            <label htmlFor="location">Location: </label>
                            <input className={styles.fieldInput} type="text" name="location"onChange={e => setFormValues({...formValues, location: e.target.value})} />
                            <br />
                            <label htmlFor="date">Date: </label>
                            <input className={styles.fieldInput} type="date" name="date" onChange={e => setFormValues({...formValues, date: e.target.value})}/>
                            <br />
                            <label htmlFor="time">Time: </label>
                            <input className={styles.fieldInput} type="time" name="time" onChange={e => setFormValues({...formValues, time: e.target.value})}/>
                            <br />
                            <label htmlFor="ticket">Ticket: </label>
                            <input className={styles.fieldInput} type="text" name="ticket" onChange={e => setFormValues({...formValues, ticket: e.target.value})}/>
                            <br />
                            <textarea name="desc" placeholder="Event Description" rows="8" onChange={e => setFormValues({...formValues, desc: e.target.value})}/>
                            <br />
                            <label htmlFor="image">Select Image: </label>
                            <input type="file" id="image" name="image" onChange={e => setFormValues({...formValues, image: e.target.files})}/>
                            <br />
                            <button className={styles.submit} name="submit" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin