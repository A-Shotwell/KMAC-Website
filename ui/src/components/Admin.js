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

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formValues)

        const formData = new FormData()
        formData.append('eventTitle', formValues.eventTitle)
        formData.append('location', formValues.location)
        formData.append('date', formValues.date)
        formData.append('time', formValues.time)
        formData.append('ticket', formValues.ticket)
        formData.append('desc', formValues.desc)
        formData.append('image', /*formValues.image*/ document.getElementById("image").files)

        console.log([...formData])

        try {
            const response = axios.post('http://localhost:4000/uploadShow', formData)
            console.log(response)
        } catch (e) {
            console.log(e)
        }

        // axios({
        //     method: "POST",
        //     url: "http://localhost:4000/uploadShow",
        //     data: formValues,
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // })
        // .then(function(res){console.log(res)})
        // .catch(function(err){console.log(err)})
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
                            <button className={styles.submit} type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin