import React from "react";
import styles from './Social.module.css'

const Social = () => {
  return (
    <div className={styles.main}>
      <h1 className={styles.banner}>REACH OUT.</h1>
      <div className={styles.socialContainer}>
        <div className={styles.listContainer}>
          <div className={`${styles.listItem} ${styles.spotify}`}>
            <a
              className={styles.link}
              href="https://open.spotify.com/artist/01MMcY0GSuDXOTUhyt4ung?si=YIgtCiw5SR26TejkA7dOcg&utm_source=copy-link&nd=1"
              target="_blank"
            />
          </div>
          <div className={`${styles.listItem} ${styles.facebook}`}>
            <a
              className={styles.link}
              href="https://www.facebook.com/MixITMac"
              target="_blank"
            />
          </div>
          <div className={`${styles.listItem} ${styles.instagram}`}>
            <a
              className={styles.link}
              href="https://www.instagram.com/kmacxkmc/"
              target="_blank"
            />
          </div>
          <div className={`${styles.listItem} ${styles.twitter}`}>
            <a
              className={styles.link}
              href="https://twitter.com/KTHAMC1"
              target="_blank"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social
