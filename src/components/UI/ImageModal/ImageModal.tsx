import React from "react";

import styles from "./ImageModal.module.scss";

interface ImageModalProps {
    imageURl: string;
    setImageURL: (imageURL: string) => void;
    children: React.ReactNode;
}

const ImageModal:React.FC<ImageModalProps> = ({imageURl, setImageURL, children}) => {

    const root = [styles.ImageModal];
    if (imageURl) root.push(styles.active);

    const closeModal = (): void => setImageURL("");
    const stopPropagation = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => event.stopPropagation();

    return (
        <div className={root.join(" ")} onClick={closeModal}>
            <div className={styles.ImageModalContent} onClick={stopPropagation}>
                {children}
            </div>
        </div>
    );
};

export default ImageModal;
