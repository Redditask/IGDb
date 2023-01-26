import React from "react";

import styles from "./AsideBar.module.scss";

import {NavLink} from "react-router-dom";

import {AsideLinks} from "../../utils/consts";

const isActive = ({isActive}: any) => isActive ? styles.AsideBar__active : styles.AsideBar__default;

const AsideBar: React.FC = () => {

    return (
        <aside className={styles.AsideBar}>
          <div className={styles.AsideBar__items}>
              {
                  AsideLinks.map((link)=>
                      <NavLink
                          className={isActive}
                          to={link.path}
                          key={link.name}
                      >
                          {link.name}
                      </NavLink>
                  )
              }
          </div>
        </aside>
    );
};

export default AsideBar;
