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

    const handleDelete = () => {
        // TODO: delete request with props.params._id

        // Alert deletion and reload page
        alert(`SHOW DELETED:\n${props.params.eventTitle}`)
        window.location.reload()
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
            <div className={styles.edit}>
                <img src="images/icons8-edit-30.png" />
            </div>
            <div className={styles.delete} onClick={() => setDeleteWarning(true)}>
                <img src="images/icons8-trash-30.png" />
            </div>
        </div>
        </div>        
    )
}

export default ShowListing