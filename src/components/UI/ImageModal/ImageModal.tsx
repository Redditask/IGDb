import React from "react";

import styles from "./ImageModal.module.scss";
import {LazyLoadImage} from "react-lazy-load-image-component";

interface ImageModalProps {
    imageURL: string;
    setImageURL: (imageURL: string) => void;
}

const ImageModal:React.FC<ImageModalProps> = ({imageURL, setImageURL}) => {

    const root: string[] = [styles.modal];
    if (imageURL) root.push(styles.active);

    const closeModal = (): void => setImageURL("");
    const stopPropagation = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => event.stopPropagation();

    return (
        <>
            {
                (imageURL.length > 0)
                &&
                <div className={root.join(" ")} onClick={closeModal}>
                    <div className={styles.modal__content} onClick={stopPropagation}>
                        <LazyLoadImage
                            className={styles.modal__image}
                            src={imageURL}
                            effect="blur"
                            alt="Game screenshot"
                        />
                    </div>
                </div>
            }
        </>
    );
};

export default ImageModal;
