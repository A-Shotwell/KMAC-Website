import { useState, useEffect } from 'react'
import styles from './Hero.module.css'

const Hero = () => {
    const [width, getWidth] = useState(0)

    useEffect(() => {
        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleResize = () => {
        getWidth(window.innerWidth)
    }


    return (
        <div className={styles.container} id="home">
            <div className={styles.heroImage} /> {/* NEW IMAGE PLACEMENET: Correct CSS for new class, reference "HERO -- Original image placement" on Desktop for old tags and CSS background urls*/}
            <div className={styles.overlay} />
            <div className={styles.background} />
        </div>
    )
}

export default Hero