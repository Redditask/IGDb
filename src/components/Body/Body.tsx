import React from "react";

import styles from "./Body.module.scss";

//тут в пропсах будет приходить игры
const Body: React.FC = () => {
    return (
        <div className={styles.Body}>
            Games will be here...
        </div>
    );
};

export default Body;
