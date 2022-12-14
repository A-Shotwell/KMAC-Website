import {React, useState} from 'react';
import styles from './Shows.module.css';
import axios from 'axios';
import { useEffect } from 'react';

/*
    PROBLEM: Horizontal scrolling shifts show template slightly to the left and right, 
    scrolling either too much or too little.
*/

const Shows = () => {
    /* 
        eventTitle: string,
        location: string,
        date: string,
        time: string,
        ticket: string,
        desc: string,
        image: file ???
    */

    const [shows, getShows] = useState([null])

    useEffect(() => {
        axios.get("http://localhost:4000/getShows").then(response => {
            getShows(response.data)
        })
    }, [])

    const displayImage = (image) => {        
        return <a href={image} target="_blank"><img src={image} className={styles.showImage} alt="poster image" /></a>
    }

    const Show = (details) => {
        return (
            <div className={styles.showMain}>
                <div className={styles.posterFrame}>
                    <span>{displayImage(details.image)}</span>
                </div>
                <div className={styles.textFrame}>
                    <h1 className={styles.showTextHeader}>{details.eventTitle}</h1>
                    <h2 className={styles.showTextInfo}>{`LOCATION: ${details.location}`}</h2>
                    <h2 className={styles.showTextInfo}>{`DATE: ${details.date}`}</h2>
                    <h2 className={styles.showTextInfo}>{`TIME: ${details.time}`}</h2>
                    <h2 className={styles.showTextInfo}>{`COVER: ${details.ticket}`}</h2>
                    <br />
                    <p className={styles.showTextDesc}>{details.desc}</p>
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
                    <div className={styles.scrollButton} onClick={() => {
                        document.getElementById('showWindow').scrollLeft -= (document.getElementById('show').offsetWidth)
                    }}>&lArr;</div>
                    <div className={styles.showWindow} id='showWindow'>
                        {!shows[0] ? <div className={styles.noShows}><p>NO UPCOMING SHOWS</p></div> : shows.map((show, index) => (
                            <div key={index} className={styles.showBody} id="show">{Show(show)}</div>
                        ))}
                    </div>
                    <div className={styles.scrollButton} onClick={() => {
                        document.getElementById('showWindow').scrollLeft += (document.getElementById('show').offsetWidth)
                    }}>&rArr;</div>
                </div>
            </div>
        </div>
    )
}

export default Shows