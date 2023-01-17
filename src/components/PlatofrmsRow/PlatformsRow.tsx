import React from "react";

import styles from "./PlatformsRow.module.scss";

import {Platform} from "../../types/types";

import {platformIconSize} from "../../utils/consts";
import {platformDefinition} from "../../utils/helpers";

import {FaPlaystation, FaWindows, FaXbox} from "react-icons/fa";


interface PlatformsRowProps {
    platformsArray: Platform[]
}

const PlatformsRow: React.FC<PlatformsRowProps> = ({platformsArray}) => {

    return (
        <div className={styles.platformsRow}>
            {platformDefinition(platformsArray, "PC")
                &&
                <FaWindows
                    size={platformIconSize}
                    title="Personal computer"
                />
            }
            {platformDefinition(platformsArray, "Xbox")
                &&
                <FaXbox
                    size={platformIconSize}
                    title="Xbox"
                />
            }
            {platformDefinition(platformsArray, "PlayStation")
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
