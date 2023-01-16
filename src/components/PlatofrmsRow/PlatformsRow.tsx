import React from "react";

import styles from "./PlatformsRow.module.scss";

import {Platform} from "../../types/types";
import {platformIconSize} from "../../utils/consts";

import {FaPlaystation, FaWindows, FaXbox} from "react-icons/fa";

interface PlatformsRowProps {
    platformsArray: Platform[]
}

const PlatformsRow: React.FC<PlatformsRowProps> = ({platformsArray}) => {

    return (
        <div className={styles.PlatformsRow}>
            {platformsArray.map((item)=>item.platform.name.includes("PC"))
                &&
                <FaWindows
                    size={platformIconSize}
                    title="Personal computer"
                />
            }
            {platformsArray.map((item)=>item.platform.name.includes("Xbox"))
                &&
                <FaXbox
                    size={platformIconSize}
                    title="Xbox"
                />
            }
            {platformsArray.map((item)=>item.platform.name.includes("PlayStation"))
                &&
                <FaPlaystation
                    size={platformIconSize}
                    title="PlayStation"
                />
            }
        </div>
    );
};

export default PlatformsRow;
