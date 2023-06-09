import React, {useEffect, useState} from "react";

import styles from "./SideBar.module.scss";

import ScrollUpButton from "../UI/ScrollUpButton/ScrollUpButton";

import {NavLink} from "react-router-dom";

import {SideBarLinks} from "../../utils/consts";
import {ICustomLink} from "../../types/types";

const isActive = ({isActive}: any) => isActive ? styles.sideBar__active : styles.sideBar__default;

const SideBar: React.FC = () => {
    const [showScrollUp, setShowScrollUp] = useState<boolean>(false);

    useEffect((): void => {
        window.addEventListener("scroll", ()=>{
            if(window.scrollY > 2600) {
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
                    SideBarLinks.map((link: ICustomLink) =>
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
