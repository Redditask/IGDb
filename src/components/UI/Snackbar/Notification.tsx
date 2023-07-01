import React, {forwardRef, useImperativeHandle, useState} from "react";

import styles from "./Notification.module.scss";

import {GrClose} from "react-icons/gr";

import {NotificationRef} from "../../../types/types";

interface NotificationProps {
    message: string;
}

const Notification= forwardRef<NotificationRef, NotificationProps>(({message}, ref) => {
    const [showNotification, setShowNotification] = useState<boolean>(false);

    useImperativeHandle(ref, (): NotificationRef => ({
        show(): void {
            setShowNotification(true);
        }
    }));

    const closeNotification = (): void => setShowNotification(false);

    const idStylesDefinition = (): string => showNotification ? styles.show : styles.hide;

    return (
        <div className={styles.container}>
            <div
                className={styles.notification}
                id={idStylesDefinition()}
            >
                <p>{message}</p>
                <GrClose
                    className={styles.closeButton}
                    title="Close notification"
                    onClick={closeNotification}
                    size={13}
                />
            </div>
        </div>
    );
});

export default Notification;
