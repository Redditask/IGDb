import React, {useEffect, useState} from "react";

import styles from "./SideBar.module.scss";

import ScrollUpButton from "../UI/ScrollUpButton/ScrollUpButton";

import {NavLink} from "react-router-dom";

import {ICustomLink} from "../../types/data";

import {SideBarLinks} from "../../utils/consts";

const isActive = ({isActive}: any) => isActive ? styles.sideBar__active : styles.sideBar__default;

const SideBar: React.FC = () => {
    const [showScrollUp, setShowScrollUp] = useState<boolean>(false);

    const scrollHandler = (): void => {
        if(window.scrollY > 2600) {
            setShowScrollUp(true);
        }else {
            setShowScrollUp(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler);

        return function (): void {
            window.removeEventListener("scroll", scrollHandler);
        }
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
                <div className={styles.scrollUp}>
                    <ScrollUpButton showScrollUp={showScrollUp}/>
                </div>
            </nav>
        </aside>
    );
};

export default SideBar;
