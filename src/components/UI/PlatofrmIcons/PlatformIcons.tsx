import React from "react";

import styles from "./PlatformIcons.module.scss";

import {FaPlaystation, FaWindows, FaXbox, FaLinux} from "react-icons/fa";
import {DiAndroid, DiApple} from "react-icons/di";
import {SiNintendoswitch} from "react-icons/si";
import {TbWorld} from "react-icons/tb";
import {RiMacLine} from "react-icons/ri";

import {IPlatform} from "../../../types/types";

import {platformIconSize} from "../../../utils/consts";
import {platformDefinition} from "../../../utils/helpers";

interface PlatformIconsProps {
    platformsArray: IPlatform[];
}

const PlatformIcons: React.FC<PlatformIconsProps> = ({platformsArray}) => {

    return (
        platformsArray
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
                {platformDefinition(platformsArray, "iOS")
                    &&
                    <DiApple
                        size={platformIconSize}
                        title="iPhone"
                    />
                }
                {platformDefinition(platformsArray, "Apple Macintosh")
                    &&
                    <RiMacLine
                        size={platformIconSize}
                        title="macOS"
                    />
                }
                {platformDefinition(platformsArray, "Linux")
                    &&
                    <FaLinux
                        size={platformIconSize}
                        title="Linux"
                    />
                }
                {platformDefinition(platformsArray, "Web")
                    &&
                    <TbWorld
                        size={platformIconSize}
                        title="Web"
                    />
                }
            </div>
            :
            <></>
    );
};

export default PlatformIcons;
