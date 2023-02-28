import React from "react";

import styles from "./PlatformIcons.module.scss";

import {FaPlaystation, FaWindows, FaXbox} from "react-icons/fa";
import {DiAndroid, DiApple} from "react-icons/di";
import {SiNintendoswitch} from "react-icons/si";

import {IPlatform} from "../../../types/types";

import {platformIconSize} from "../../../utils/consts";
import {platformDefinition} from "../../../utils/helpers";

interface PlatformIconsProps {
    platformsArray: IPlatform[];
}

const PlatformIcons: React.FC<PlatformIconsProps> = ({platformsArray}) => {

    return (
        platformsArray.length
            ?
            <div className={styles.icons}>
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
                {platformDefinition(platformsArray, "Nintendo")
                    &&
                    <SiNintendoswitch
                        size={platformIconSize}
                        title="Nintendo"
                    />
                }
                {platformDefinition(platformsArray, "Android")
                    &&
                    <DiAndroid
                        size={platformIconSize}
                        title="Android"
                    />
                }
                {platformDefinition(platformsArray, "Android")
                    &&
                    <DiApple
                        size={platformIconSize}
                        title="iOS"
                    />
                }
            </div>
            :
            <></>
    );
};

export default PlatformIcons;
