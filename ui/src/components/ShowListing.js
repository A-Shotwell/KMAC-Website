import { useState } from 'react'
import axios from 'axios'
import styles from './ShowListing.module.css'
import { dateConvert, timeConvert } from '../utils/conversions'

// SHOW OBJECT SHAPE:
//     (_id)
//     eventTitle: null,
//     location: null,
//     date: null,
//     time: null,
//     ticket: null,
//     desc: null,
//     image: null

const ShowListing = (props) => {
    // Toggle deletion warning
    const [deleteWarning, setDeleteWarning] = useState(false)

    // Toggle form
    const [editForm, setEditForm] = useState(false)

    // Form values, initialized with old values as default
    const [formValues, setFormValues] = useState({
        eventTitle: props.params.eventTitle,
        location: props.params.location,
        date: dateConvert(props.params.date),
        time: timeConvert(props.params.time),
        ticket: props.params.ticket,
        desc: props.params.desc,
        image: null
    })

    const handleDelete = () => {
        // TODO: delete request with props.params._id
        axios.post('http://localhost:4000/delShow', { _id: props.params._id })

        // Alert deletion and reload page
        alert(`SHOW DELETED:\n${props.params.eventTitle}`)
        window.location.reload()
    }

    const handleEditSubmit = async (e) => {     
        e.preventDefault()

        // TODO: post request for show update with props.params._id
        const formData = new FormData()

        // FILE READER
        const getImageFile = () => {
            return new Promise(resolve => {
                const reader = new FileReader()
                reader.onload = function () {
                    resolve(reader.result)
                }
                reader.readAsDataURL(document.getElementById("editImage").files[0])
            })
        }
        
        const imageFile = await getImageFile()

        formData.append('_id', props.params._id)
        
        Array.from(document.getElementById("editForm").elements).forEach(element => {           
            switch (element.name){
                case "editImage":
                    formData.append(`${element.name}`, imageFile) // UNDEFINED. WHY?
                    break
                case "submit":
                    break
                default:
                    formData.append(`${element.name}`, element.value)
            }
        })

        try {
            const response = axios.post('http://localhost:4000/updateShow', formData)
            console.log(response)
            alert(`SHOW EDITED:\n${formValues.eventTitle}\nFORMERLY:\n${props.params.eventTitle}`)
            window.location.reload()

        } catch (e) {
            alert(e)
        }
        // -------------------- Taken and modified from Admin.js form -------------------------
    }

    return (
        <div className={styles.temp}>
        <div className={styles.container}>
            {
                deleteWarning &&
                <div className={styles.deleteWarning}>
                    <div><p>Delete this show listing?</p></div>
                    <div><button className={`${styles.deleteButton} ${styles.deleteYes}`} onClick={handleDelete}>Yes</button></div>
                    <div><button className={`${styles.deleteButton} ${styles.deleteNo}`} onClick={() => setDeleteWarning(false)}>No</button></div>
                </div>
            }
            <div className={styles.title}>
                <p>{props.params.eventTitle}</p>
            </div>
            <div className={styles.date}>
                <p>{`${props.params.date} -- ${props.params.time}`}</p>
            </div>
            <div className={styles.edit} onClick={() => setEditForm(true)}>
                <img src="images/icons8-edit-30.png" />
            </div>
            <div className={styles.delete} onClick={() => setDeleteWarning(true)}>
                <img src="images/icons8-trash-30.png" />
            </div>
            <br/>
        </div>
        {
            editForm &&
            <div className={styles.formContainer}>
                <div className={styles.formFrame}>
                    <form id="editForm" enctype="multipart/form-data" onSubmit={e => handleEditSubmit(e)}>
                        <label className={styles.formLabel} htmlFor="eventTitle">Event Title: </label>
                        <br />
                        <input className={styles.fieldInput} type="text" name="eventTitle" defaultValue={props.params.eventTitle} onChange={e => setFormValues({...formValues, eventTitle: e.target.value})}/>
                        <br />
                        <label className={styles.formLabel} htmlFor="location">Location: </label>
                        <br />
                        <input className={styles.fieldInput} type="text" name="location" defaultValue={props.params.location} onChange={e => setFormValues({...formValues, location: e.target.value})} />
                        <br />
                        <label className={styles.formLabel} htmlFor="date">Date: </label>
                        <br />
                        <input className={styles.fieldInput} type="date" name="date" defaultValue={dateConvert(props.params.date)} onChange={e => setFormValues({...formValues, date: e.target.value})}/>
                        <br />
                        <label className={styles.formLabel} htmlFor="time">Time: </label>
                        <br />
                        <input className={styles.fieldInput} type="time" name="time" defaultValue={timeConvert(props.params.time)} onChange={e => setFormValues({...formValues, time: e.target.value})}/>
                        <br />
                        <label className={styles.formLabel} htmlFor="ticket">Ticket: </label>
                        <br />
                        <input className={styles.fieldInput} type="text" name="ticket" defaultValue={props.params.ticket} onChange={e => setFormValues({...formValues, ticket: e.target.value})}/>
                        <br />
                        <br />
                        <textarea className={styles.formDesc} name="desc" placeholder="Event Description" rows="8" defaultValue={props.params.desc} onChange={e => setFormValues({...formValues, desc: e.target.value})}/>
                        <br />
                        <label className={styles.formLabel} htmlFor="image">Please update image &#40;15MB or less&#41;: </label>
                        <input style={{color: "red"}} type="file" id="editImage" name="editImage" accept="image/jpeg" onChange={e => setFormValues({...formValues, image: e.target.files})}/>
                        <br />
                        <br />
                        <button className={styles.submit} name="submit" type="submit">Submit</button>
                        <button name="cancel" onClick={() => setEditForm(false)}>Cancel</button>
                    </form>
                </div>
            </div>
        }
        </div>        
    )
}

export default ShowListing