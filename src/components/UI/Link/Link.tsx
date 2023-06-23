import React from "react";

import styles from "./Link.module.scss";

interface LinkProps {
    name: string;
    link: string;
}

const Link:React.FC<LinkProps> = ({name, link}) => {

    return (
        <>
            {
                !!link
                &&
                <a
                    href={link}
                    className={styles.link}
                >
                    {name}
                </a>
            }
        </>
    );
};

export default Link;
