/*
    NOTE:
    The purpose of the "noScroll" div is to fix a bug with the profile pic. It
    would occasionally jitter upon scrolling and prevent normal scrolling behavior.
*/

import { useState } from "react";
import styles from "./About.module.css";

const About = () => {
    const aboutText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum. Volutpat diam ut venenatis tellus in metus vulputate eu scelerisque. Consectetur lorem donec massa sapien faucibus et. Arcu dictum varius duis at consectetur lorem donec. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Nulla porttitor massa id neque aliquam vestibulum morbi. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. Ante metus dictum at tempor commodo. Scelerisque felis imperdiet proin fermentum leo.

    Vel risus commodo viverra maecenas accumsan lacus vel. Pharetra sit amet aliquam id. Sed enim ut sem viverra aliquet eget sit amet. Facilisis mauris sit amet massa vitae tortor condimentum. Feugiat in ante metus dictum at. Diam quam nulla porttitor massa id neque aliquam vestibulum morbi. Aliquet lectus proin nibh nisl condimentum. Aliquam ut porttitor leo a diam sollicitudin tempor id. Et tortor at risus viverra adipiscing at in tellus. Est pellentesque elit ullamcorper dignissim cras. Urna nec tincidunt praesent semper feugiat nibh.`

    return (
        <div className={styles.main} id="about">
            <div className={styles.overlay}>
                <section className={styles.section}>
                    <h1 className={styles.header}>The <span style={{color: "rgba(51, 169, 236, 1)"}}>Man</span>, The <span style={{color: "rgba(51, 169, 236, 1)"}}>Myth</span>, The <span style={{color: "rgba(74, 183, 35, 1)"}}>DJ</span></h1>
                    <div className={styles.textContainer}>
                        <p className={styles.text}>{aboutText}</p>
                    </div>
                </section>
                <div className={styles.noScroll}>
                    <div className={styles.border}>
                        <div className={styles.profilePic} />
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default About;