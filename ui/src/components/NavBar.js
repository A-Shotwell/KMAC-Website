/*

  PROBLEMS:
    - clicking the dropdown menu button and then resizing the window back to desktop width leaves dropdown open.

*/

import { React, useEffect, useState } from "react";
import styles from "./NavBarCSS.module.css";

const NavBar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [dropMenu, setDropMenu] = useState(false);
    
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

    const handleMenuClick = () => {
      setDropMenu(prev => !prev)
    }

    const dropDown = {
      
    }

   return (
    <div className={styles.main}>
      <nav className={styles.container}>
        <div className={`${styles.nav} ${styles.navLeft}`}>
          <ul>
            <li>
              <button role="button" onClick={null}>HOME</button>
            </li>
            <li>
              <button role="button" onClick={null}>ABOUT</button>
            </li>
          </ul>
        </div>
        <div className={`${styles.nav} ${styles.navRight}`}>
          <ul>
            <li>
              <button role="button" onClick={null}>SHOWS</button>
            </li>
            <li>
              <button role="button" onClick={null}>CONTACT</button>
            </li>
          </ul>
        </div>
      </nav>
      {
          dropMenu
          ? <img src="images/CloseMenuButton.png" className={styles.menuButton} alternative="Menu" onClick={handleMenuClick} />
          : <img src="images/MenuButton.png" className={styles.menuButton} alternative="Menu" onClick={handleMenuClick} />
      }
      { dropMenu && 
        <nav className={styles.navDrop}>
          <ul>
            <li>
              <button role="button" onClick={null}>HOME</button>
            </li>
            <li>
              <button role="button" onClick={null}>ABOUT</button>
            </li>
            <li>
              <button role="button" onClick={null}>SHOWS</button>
            </li>
            <li>
              <button role="button" onClick={null}>CONTACT</button>
            </li>
          </ul>
        </nav>
      }
      <img src="images/logo.png" alt="KMAC logo" className={`${styles.logo} ${scrollPosition > 0 ? styles.logoNav : styles.logoHero}`} />
    </div>
  );
};

export default NavBar;
