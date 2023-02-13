import React, {useEffect, useState} from "react";

import styles from "./SideBar.module.scss";

import ScrollUpButton from "../UI/ScrollUpButton/ScrollUpButton";

import {NavLink} from "react-router-dom";

import {SideBarLinks} from "../../utils/consts";

const isActive = ({isActive}: any) => isActive ? styles.sideBar__active : styles.sideBar__default;

const SideBar: React.FC = () => {
    const [showScrollUp, setShowScrollUp] = useState<boolean>(false);

    useEffect(()=>{
        window.addEventListener("scroll", ()=>{
            if(window.scrollY > 3200) {
                setShowScrollUp(true);
            }else {
                setShowScrollUp(false);
            }
        });
    }, []);

    return (
        <aside className={styles.sideBar}>
            <nav className={styles.sideBar__items}>
                {
                    SideBarLinks.map((link) =>
                        <NavLink
                            className={isActive}
                            to={link.path}
                            key={link.name}
                        >
                            {link.name}
                        </NavLink>
                    )
                }
                <ScrollUpButton showScrollUp={showScrollUp}/>
            </nav>
        </aside>
    );
};

export default SideBar;
