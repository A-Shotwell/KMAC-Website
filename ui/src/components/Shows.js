import {React, useState} from 'react';
import styles from './Shows.module.css';

/*
    PROBLEM: Horizontal scrolling shifts show template slightly to the left and right
*/

// FOR TESTING PURPOSES
const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci. Dignissim suspendisse in est ante in nibh mauris. Sem et tortor consequat id porta nibh venenatis cras sed. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Pellentesque massa placerat duis ultricies lacus sed. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Faucibus a pellentesque sit amet porttitor eget dolor. Tristique sollicitudin nibh sit amet commodo. Id donec ultrices tincidunt arcu non sodales neque sodales. Nulla at volutpat diam ut. Scelerisque mauris pellentesque pulvinar pellentesque habitant. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. At volutpat diam ut venenatis tellus in metus. Amet est placerat in egestas. Ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla. Eu lobortis elementum nibh tellus molestie nunc non. Dui faucibus in ornare quam viverra orci sagittis. Scelerisque in dictum non consectetur a. Neque gravida in fermentum et sollicitudin."

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

    // FOR TESTING PURPOSES, REPLACE WITH ARRAY FROM DATABASE QUERY
    const testShows = [
        {
            eventTitle: "EVENT 1",
            location: "Location 1",
            date: "September 1st",
            time: "6PM",
            ticket: "$5.00",
            desc: lorem,
            image: "IMAGE PENDING"
        },
        {
            eventTitle: "EVENT 2",
            location: "Location 2",
            date: "September 5th",
            time: "7PM",
            ticket: "$10.00",
            desc: lorem,
            image: "IMAGE PENDING"
        },
        {
            eventTitle: "EVENT 3",
            location: "Location 3",
            date: "September 21st",
            time: "8PM",
            ticket: "$15.00",
            desc: lorem,
            image: "IMAGE PENDING"
        }
    ]

    const displayImage = () => {
        // REPLACE WITH IMAGE FILE FROM DATABASE QUERY, FILE READER?
        return <img src={process.env.PUBLIC_URL+"images/poster.jpg"} style={{height: 'auto', width: '100%'}} alt="poster image" />
    }

    const Show = (details) => {
        return (
            <div className={styles.showMain}>
                <div className={styles.posterFrame} style={null /* SET BACKGROUND IMAGE HERE, COVER??? */}>
                    {/* <span>{details.image}</span> */}
                    <span>{displayImage()}</span>
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
                        {testShows.map((show, index) => (
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