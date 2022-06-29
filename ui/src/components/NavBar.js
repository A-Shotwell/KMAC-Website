import { React, useState } from "react";
import styles from "./NavBarCSS.module.css";

const NavBar = () => {
  return (
    <div>
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
      <img src="images/logo.png" alt="KMAC logo" className={`${styles.logo} ${styles.logoSplash}`} />
    </div>
  );
};

export default NavBar;
