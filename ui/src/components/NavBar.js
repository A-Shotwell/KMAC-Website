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

    const handleSelect = (target) => {
      const element = document.querySelector(`#${target}`);
      element.scrollIntoView({behavior: 'smooth', block: 'end'});
      setDropMenu(false);
    }

   return (
    <div className={styles.main}>
      <nav className={styles.container}>
        <div className={`${styles.nav} ${styles.navLeft}`}>
          <ul>
            <li>
              <button role="button" onClick={e => handleSelect("home")}>HOME</button>
            </li>
            <li>
              <button role="button" onClick={e => handleSelect("about")}>ABOUT</button>
            </li>
          </ul>
        </div>
        <div className={`${styles.nav} ${styles.navRight}`}>
          <ul>
            <li>
              <button role="button" onClick={e => handleSelect("shows")}>SHOWS</button>
            </li>
            <li>
              <button role="button" onClick={e => handleSelect("contact")}>CONTACT</button>
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
              <button role="button" onClick={e => handleSelect("home")}>HOME</button>
            </li>
            <li>
              <button role="button" onClick={e => handleSelect("about")}>ABOUT</button>
            </li>
            <li>
              <button role="button" onClick={e => handleSelect("shows")}>SHOWS</button>
            </li>
            <li>
              <button role="button" onClick={e => handleSelect("contact")}>CONTACT</button>
            </li>
          </ul>
        </nav>
      }
      <img src="images/logo.png" alt="KMAC logo" className={`${styles.logo} ${scrollPosition > 0 ? styles.logoNav : styles.logoHero}`} />
    </div>
  );
};

export default NavBar;
