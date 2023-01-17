import React from "react";

import {NavLink} from "react-router-dom";

import styles from "./AsideBar.module.scss";

import {AsideLinks} from "../../utils/consts";

const AsideBar: React.FC = () => {

    return (
        <aside className={styles.AsideBar}>
          <ul className={styles.AsideBar__items}>
              {
                  AsideLinks.map((link)=>
                      <NavLink
                          className={styles.AsideBar__item}
                          to={link.path}
                          key={link.name}
                      >
                          {link.name}
                      </NavLink>
                  )
              }
          </ul>
        </aside>
    );
};

export default AsideBar;
