import React, {forwardRef, useImperativeHandle, useState} from "react";

import styles from "./Notification.module.scss";

import {NotificationRef} from "../../../types/data";

const Notification= forwardRef<NotificationRef, {}>(({}, ref) => {
    const [isShowNotification, setIsShowNotification] = useState<boolean>(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
    const [notificationMessage, setNotificationMessage] = useState<string>("");

    useImperativeHandle(ref, (): NotificationRef => ({
        show(message: string): void {
            if (timeoutId) clearTimeout(timeoutId);

            setNotificationMessage(message);
            setIsShowNotification(true);

            let newTimeout: NodeJS.Timeout = setTimeout((): void => {
                setIsShowNotification(false);
            }, 3000);

            setTimeoutId(newTimeout);
        }
    }));

    const idStylesDefinition = (): string => isShowNotification ? styles.show : styles.hide;

    return (
        <div className={styles.container}>
            <div
                className={styles.notification}
                id={idStylesDefinition()}
            >
                <p>{notificationMessage}</p>
            </div>
        </div>
    );
});

export default Notification;
