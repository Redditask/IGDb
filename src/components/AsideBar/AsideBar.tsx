import React from "react";

import styles from "./AsideBar.module.scss";

const AsideBar: React.FC = () => {

    return (
        <aside className={styles.AsideBar}>
          <ul className={styles.AsideBar__items}>
              <li className={styles.AsideBar__item}>
                  Home
              </li>
              <li className={styles.AsideBar__item}>
                  New Releases
              </li>
              <li className={styles.AsideBar__item}>
                  Top
              </li>
              <li className={styles.AsideBar__item}>
                  All Games
              </li>
          </ul>
        </aside>
    );
};

export default AsideBar;
