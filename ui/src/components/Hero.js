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
            {window.innerWidth >= 1100  && <img src="images/kmac-transparent-1-red.png" className={styles.imageWide}/>}
            {window.innerWidth < 1100 && window.innerWidth > 500  && <img src="images/kmac-transparent-2-red.png" className={styles.imageMedium}/>}
            {window.innerWidth <= 500  && <img src="images/kmac-transparent-3-red.png" className={styles.imageMobile}/>}
            <div className={styles.overlay} />
            <div className={styles.background} />
        </div>
    )
}

export default Hero