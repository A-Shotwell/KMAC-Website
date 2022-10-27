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

        const formData = new FormData()

        // FILE READER
        const getImageFile = () => {
            return new Promise(resolve => {
                const reader = new FileReader()
                reader.onload = function () {
                    resolve(reader.result)
                    // console.log(`IMAGE FILE:\n ${imageFile}`) // imageFile IS NOT UNDEFINED HERE, BASE64 STRING
                }
                reader.readAsDataURL(document.getElementById("image").files[0])
            })
        }
        
        const imageFile = await getImageFile()
        
        Array.from(document.getElementById("form").elements).forEach(element => {           
            switch (element.name){
                case "image":
                    formData.append(`${element.name}`, imageFile) // UNDEFINED. WHY?
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
            alert('NEW SHOW SUBMITTED')
            document.getElementById("form").reset()

        } catch (e) {
            alert(e)
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
                        <form className={styles.showForm} id="form" method="post" encType="multipart/form-data" onSubmit={e => handleSubmit(e)}>
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
                            <label htmlFor="image">Select Image &#40;15MB or less&#41;: </label>
                            <input type="file" id="image" name="image" accept="image/jpeg" onChange={e => setFormValues({...formValues, image: e.target.files})}/>
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