import React from "react";

import styles from "./PlatformIcons.module.scss";

import {FaPlaystation, FaWindows, FaXbox, FaLinux} from "react-icons/fa";
import {DiAndroid, DiApple} from "react-icons/di";
import {SiNintendoswitch} from "react-icons/si";
import {TbWorld} from "react-icons/tb";
import {RiMacLine} from "react-icons/ri";

import {IPlatform} from "../../../types/types";

import {platformIconSize} from "../../../utils/consts";

import {platformValidation} from "../../../utils/helpers/validation";

interface PlatformIconsProps {
    platformsArray: IPlatform[];
}

const PlatformIcons: React.FC<PlatformIconsProps> = ({platformsArray}) => {

    return (
        <>
            {
                (platformsArray && !!platformsArray.length)
                &&
                <div className={styles.icons}>
                    {platformValidation(platformsArray, "PC")
                        &&
                        <FaWindows
                            size={platformIconSize}
                            title="Personal computer"
                        />
                    }
                    {platformValidation(platformsArray, "Xbox")
                        &&
                        <FaXbox
                            size={platformIconSize}
                            title="Xbox"
                        />
                    }
                    {platformValidation(platformsArray, "PlayStation")
                        &&
                        <FaPlaystation
                            size={platformIconSize}
                            title="PlayStation"
                        />
                    }
                    {platformValidation(platformsArray, "Nintendo")
                        &&
                        <SiNintendoswitch
                            size={platformIconSize}
                            title="Nintendo"
                        />
                    }
                    {platformValidation(platformsArray, "Android")
                        &&
                        <DiAndroid
                            size={platformIconSize}
                            title="Android"
                        />
                    }
                    {platformValidation(platformsArray, "iOS")
                        &&
                        <DiApple
                            size={platformIconSize}
                            title="iPhone"
                        />
                    }
                    {platformValidation(platformsArray, "Apple Macintosh")
                        &&
                        <RiMacLine
                            size={platformIconSize}
                            title="macOS"
                        />
                    }
                    {platformValidation(platformsArray, "Linux")
                        &&
                        <FaLinux
                            size={platformIconSize}
                            title="Linux"
                        />
                    }
                    {platformValidation(platformsArray, "Web")
                        &&
                        <TbWorld
                            size={platformIconSize}
                            title="Web"
                        />
                    }
                </div>
            }
        </>
    );
};

export default PlatformIcons;
