import React from 'react';

import styles from "./ErrorMessage.module.scss";

const ErrorMessage:React.FC = () => {
    return (
        <h1 className={styles.error}>Oops, something go wrong...</h1>
    );
};

export default ErrorMessage;
