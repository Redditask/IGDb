import React, {forwardRef, useImperativeHandle, useState} from "react";

import styles from "./Notification.module.scss";

import {NotificationRef} from "../../../types/types";

interface NotificationProps {
    message: string;
}

const Notification= forwardRef<NotificationRef, NotificationProps>(({message}, ref) => {
    const [isShowNotification, setIsShowNotification] = useState<boolean>(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

    useImperativeHandle(ref, (): NotificationRef => ({
        show(): void {
            if (timeoutId) clearTimeout(timeoutId);

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
                <p>{message}</p>
            </div>
        </div>
    );
});

export default Notification;
