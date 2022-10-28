import { useState } from 'react'
import styles from './ShowListing.module.css'

// const [formValues, setFormValues] = useState({
//     eventTitle: null,
//     location: null,
//     date: null,
//     time: null,
//     ticket: null,
//     desc: null,
//     image: null
// })

const ShowListing = (props) => {
    // Toggle deletion warning
    const [deleteWarning, setDeleteWarning] = useState(false)
    const [editForm, setEditForm] = useState(false)
    const [formValues, setFormValues] = useState({
        eventTitle: null,
        location: null,
        date: null,
        time: null,
        ticket: null,
        desc: null,
        image: null
    })

    const handleDelete = () => {
        // TODO: delete request with props.params._id

        // Alert deletion and reload page
        alert(`SHOW DELETED:\n${props.params.eventTitle}`)
        window.location.reload()
    }

    const handleEditSubmit = () => {
        // TODO: post request for update with props.params._id
    }

    const dateConvert = () => {
        // TODO: covert props.param.date to format "year-month-day", call for date input default value
        // date: "10-30-2022"
        return "2022-10-30" // <-- This format works
    }

    const timeConvert = () => {
        // TODO: covert props.param.ttime to 24-hour format, call for time input default value
        // time: "5:00 PM"
        return "17:00" // <-- This format works
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
                    <form id="editForm" onSubmit={handleEditSubmit}>
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
                        <input className={styles.fieldInput} type="date" name="date" defaultValue={dateConvert()} onChange={e => setFormValues({...formValues, date: e.target.value})}/>
                        <br />
                        <label className={styles.formLabel} htmlFor="time">Time: </label>
                        <br />
                        <input className={styles.fieldInput} type="time" name="time" defaultValue={timeConvert()} onChange={e => setFormValues({...formValues, time: e.target.value})}/>
                        <br />
                        <label className={styles.formLabel} htmlFor="ticket">Ticket: </label>
                        <br />
                        <input className={styles.fieldInput} type="text" name="ticket" defaultValue={props.params.ticket} onChange={e => setFormValues({...formValues, ticket: e.target.value})}/>
                        <br />
                        <br />
                        <textarea className={styles.formDesc} name="desc" placeholder="Event Description" rows="8" defaultValue={props.params.desc} onChange={e => setFormValues({...formValues, desc: e.target.value})}/>
                        <br />
                        <label className={styles.formLabel} htmlFor="image">Please update image &#40;15MB or less&#41;: </label>
                        <input type="file" id="image" name="image" accept="image/jpeg" onChange={e => setFormValues({...formValues, image: e.target.files})}/>
                        <br />
                        <br />
                        <button className={styles.submit} name="submit" type="submit">Submit</button>
                        <button onClick={() => setEditForm(false)}>Cancel</button>
                    </form>
                </div>
            </div>
        }
        </div>        
    )
}

export default ShowListing