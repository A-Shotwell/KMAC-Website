import {useState} from 'react';
import styles from './Shows.module.css';

const Shows = () => {
    /* 
        eventTitle: string,
        location: string,
        time: string,
        ticket: string,
        desc: string,
        image: file ???
*/
    const Show = (details) => {
        return (
            <div className={styles.showMain}>
                <div className={styles.posterFrame} style={null /* SET BACKGROUND IMAGE HERE, COVER??? */}/>
                <div className={styles.textFrame}>
                    TEST
                </div>
            </div>
        )
    }

    return (
        <div className={styles.main} id="shows">
            <div className={styles.container}>
                <div className={styles.banner}>
                    <h1 className={styles.bannerText}>UPCOMING SHOWS</h1>
                </div>
                <div className={styles.scrollContainer}>
                    <div className={styles.scrollButton}>&lt;</div>
                    <div className={styles.showWindow}>
                        <div className={styles.showBody}>{Show(null)}</div>
                        <div className={styles.showBody}>{Show(null)}</div>
                    </div>
                    <div className={styles.scrollButton}>&gt;</div>
                </div>
            </div>
        </div>
    )
}

export default Shows