import React from "react";

import styles from "./Message.module.scss";

interface MessageProps {
    text: string;
}

const Message:React.FC<MessageProps> = ({text}) => {
    return (
        <h1 className={styles.message}>{text}</h1>
    );
};

export default Message;
