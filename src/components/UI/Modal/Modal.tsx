import React from "react";

import styles from "./Modal.module.scss";

interface ModalProps {
    isShow: boolean;
    setIsShow: (isShow: boolean) => void;
    pageReload?: () => void;
    children: React.ReactNode;
    modalContainerStyles: string;
}

const Modal: React.FC<ModalProps> = ({isShow, setIsShow, children, modalContainerStyles, pageReload}) => {

    const root: string[] = [styles.modal];
    if (isShow) root.push(styles.active);

    const closeModal = (): void => {
        setIsShow(false);
        if (pageReload) pageReload();
    };

    const stopPropagation = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => event.stopPropagation();

    return (
        <>
            {
                isShow
                &&
                <div className={root.join(" ")} onClick={closeModal}>
                    <div className={modalContainerStyles} onClick={stopPropagation}>
                        {children}
                    </div>
                </div>
            }
        </>
    );
};

export default Modal;
