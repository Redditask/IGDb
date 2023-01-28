import React, {useEffect, useState} from "react";

import styles from "./SideBar.module.scss";

import {NavLink} from "react-router-dom";
import {AiOutlineArrowUp} from "react-icons/ai";

import {SideBarLinks} from "../../utils/consts";
import {scrollUp} from "../../utils/helpers";

const isActive = ({isActive}: any) => isActive ? styles.SideBar__active : styles.SideBar__default;

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
    }, [])

    return (
        <aside className={styles.SideBar}>
            <nav className={styles.SideBar__items}>
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
                {
                    showScrollUp
                    &&
                    <AiOutlineArrowUp
                        title="Scroll up"
                        className={styles.SideBar__scrollUp}
                        size={40}
                        onClick={scrollUp}
                    />
                }
            </nav>
        </aside>
    );
};

export default SideBar;
