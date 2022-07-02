import { React, useEffect, useState } from "react";
import styles from "./NavBarCSS.module.css";

const NavBar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
    
    const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
    }, []);

   return (
    <div className={styles.main}>
      <nav className={styles.container}>
        <div className={`${styles.nav} ${styles.navLeft}`}>
          <ul>
            <li>
              <a href="">HOME</a>
            </li>
            <li>
              <a href="">ABOUT</a>
            </li>
          </ul>
        </div>
        <div className={`${styles.nav} ${styles.navRight}`}>
          <ul>
            <li>
              <a href="">SHOWS</a>
            </li>
            <li>
              <a href="">CONTACT</a>
            </li>
          </ul>
        </div>
      </nav>
      {/* <img src="images/logo.png" alt="KMAC logo" className={`${styles.logo} ${scroll ? styles.logoNav : styles.logoHero}`} /> */}
      <img src="images/logo.png" alt="KMAC logo" className={`${styles.logo} ${scrollPosition > 0 ? styles.logoNav : styles.logoHero}`} />
      {/* <button style={{color: "red"}} onClick={() => setScroll(!scroll)}>TOGGLE LOGO POSITION</button> */}
    </div>
  );
};

export default NavBar;
