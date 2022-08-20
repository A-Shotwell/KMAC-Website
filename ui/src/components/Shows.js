import {useState} from 'react';
import styles from './Shows.module.css';

const Shows = () => {
    return (
        <div className={styles.main} id="shows">
            {/* <div className={styles.container}>
                <div className={styles.banner}>
                    <h1 className={styles.bannerText}>UPCOMING SHOWS</h1>
                </div>
                </div>
                <div className={styles.scrollContainer}>
                    <div className={styles.scrollButton}>&lt;</div>
                    <div className={styles.showBody}>
                    <div className={styles.scrollButton}>&gt;</div>
                </div>
            </div> */}
            <div className={styles.container}>
                <div className={styles.banner}>
                    <h1 className={styles.bannerText}>UPCOMING SHOWS</h1>
                </div>
                <div className={styles.scrollContainer}>
                    <div className={styles.scrollButton}>&lt;</div>
                    <div className={styles.showBody}>TEST</div>
                    <div className={styles.scrollButton}>&gt;</div>
                </div>
            </div>
        </div>
    )
}

export default Shows