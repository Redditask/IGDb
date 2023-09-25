import React, {useEffect, useState} from "react";

import {useUpdateUserPlatformsMutation} from "../../API/igdbAPI";

import styles from "./AccountInfoEditer.module.scss";

import {useAppDispatch} from "../../hooks";
import {setIsError, setIsFetching} from "../../store/userSlice";

import PlatformIcons from "../UI/PlatofrmIcons/PlatformIcons";
import Button from "../UI/Button/Button";

import {GetAccountInfoQueryResult} from "../../types/queries/results";
import {IPlatform} from "../../types/data";

import {platformsList} from "../../utils/consts";
import {platformListToPlatformsConvert} from "../../utils/helpers/converters";

interface AccountInfoEditerProps {
    username: string;
    userInfo: GetAccountInfoQueryResult;
    setIsEdit: (isEdit: boolean) => void;
}

const AccountInfoEditer: React.FC<AccountInfoEditerProps> = ({username, userInfo, setIsEdit}) => {
    const [selectedPlatforms, setSelectedPlatforms] = useState<IPlatform []>(userInfo.platforms);
    const plaforms = platformListToPlatformsConvert(platformsList);

    const [updatePlatforms, {isLoading, isError}] = useUpdateUserPlatformsMutation();

    const dispatch = useAppDispatch();

    const closeEditer = (): void => setIsEdit(false);

    const updatePlatformsHandler = async (): Promise<void> => {
        const response = await updatePlatforms(
            selectedPlatforms
        ).unwrap().catch((err) => err);

        if (response?.status === 200){
            closeEditer();
            //showNotification("Platforms was updated");
        } else if (response?.data?.message) {
            closeEditer();
        }
    };

    const platformSelecterHandler = (platform: IPlatform): void => {
        if (selectedPlatformsChecker(platform)) {
            setSelectedPlatforms(selectedPlatforms.filter((currentPlatform: IPlatform): boolean =>
                currentPlatform.platform.name !== platform.platform.name));
        } else {
            setSelectedPlatforms([...selectedPlatforms, platform]);
        }
    };

    const selectedPlatformsChecker = (plaform: IPlatform): boolean => {
        let isIncludes: boolean = false;

        selectedPlatforms.forEach((selectedPlaform: IPlatform): void => {
            if (selectedPlaform.platform.name === plaform.platform.name) isIncludes = true;
        });

        return isIncludes;
    };

    useEffect((): void => {
        dispatch(setIsFetching(isLoading));
    }, [isLoading]);

    useEffect((): void => {
        dispatch(setIsError(isError));
    }, [isError]);

    return (
        <div className={styles.editerForm}>
            <h2>{username}</h2>
            <div className={styles.editerForm__currentPlatforms}>
                <h3>PLATFORMS: </h3>
                {
                    !!selectedPlatforms.length
                        ?
                        <PlatformIcons platformsArray={selectedPlatforms}/>
                        :
                        <h3 className={styles.editerForm__message}>NO SELECTED PLATFORMS</h3>
                }
            </div>
            <div className={styles.editerForm__checkboxList}>
                {plaforms.map((platfrom: IPlatform) => (
                    <div
                        className={styles.editerForm__checkboxItem}
                        key={platfrom.platform.id}
                    >
                        <input
                            type="checkbox"
                            checked={selectedPlatformsChecker(platfrom)}
                            onChange={() => platformSelecterHandler(platfrom)}
                        />
                        <h3>{platfrom.platform.name}</h3>
                    </div>
                ))}
            </div>
            <div className={styles.editerForm__buttons}>
                <Button
                    title="Close"
                    onClick={closeEditer}
                />
                <Button
                    title="Save"
                    onClick={updatePlatformsHandler}
                />
            </div>
        </div>
    );
};

export default AccountInfoEditer;
