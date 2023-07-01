import React, {forwardRef, useImperativeHandle, useState} from "react";

import styles from "./Snackbar.module.scss";

import {SnackbarRef} from "../../../types/types";
import {set} from "react-hook-form";

interface SnackbarProps {
    message: string;
}

const Snackbar= forwardRef<SnackbarRef, SnackbarProps>(({message}, ref) => {
   const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

   let timeout: NodeJS.Timeout;

   useImperativeHandle(ref, () => ({
       show(): void {
           clearTimeout(timeout);
           setShowSnackbar(true);
           timeout = setTimeout((): void => {
               setShowSnackbar(false);
           }, 4000);
       }
   }));

    const idStylesDefinition = (): string => showSnackbar ? styles.show : styles.hide;

    return (
        <div className={styles.container}>
            <div
                className={styles.snackbar}
                id={idStylesDefinition()}
            >
                <p>{message}</p>
            </div>
        </div>
    );
});

export default Snackbar;
