import React, {ChangeEvent, forwardRef, useEffect, useState} from "react";

import {useUpdateUserIconMutation, useUpdateUserPlatformsMutation} from "../../API/igdbAPI";

import styles from "./AccountInfoEditer.module.scss";

import {useAppDispatch} from "../../hooks";
import {setIsError, setIsFetching} from "../../store/userSlice";

import PlatformIcons from "../UI/PlatofrmIcons/PlatformIcons";
import Button from "../UI/Button/Button";

import {GetAccountInfoQueryResult} from "../../types/queries/results";
import {IPlatform, NotificationRef} from "../../types/data";

import {platformsList} from "../../utils/consts";
import {platformListToPlatformsConvert} from "../../utils/helpers/converters";

interface AccountInfoEditerProps {
    userInfo: GetAccountInfoQueryResult;
    setIsEdit: (isEdit: boolean) => void;
    refetchInfo: () => void;
}

const AccountInfoEditer = forwardRef<NotificationRef, AccountInfoEditerProps>(({
         userInfo,
         setIsEdit,
         refetchInfo
    }, ref) => {

    const [selectedPlatforms, setSelectedPlatforms] = useState<IPlatform []>(userInfo.platforms);
    const [userIcon, setUserIcon] = useState<File>();
    const plaforms = platformListToPlatformsConvert(platformsList);

    const [updatePlatforms, {isLoading: isLoadingPlatforms, isError: isErrorPlatforms}] = useUpdateUserPlatformsMutation();
    const [updateUserIcon, {isLoading: isLoadingIcon, isError: isErrorIcon}] = useUpdateUserIconMutation();

    const dispatch = useAppDispatch();

    const showNotification = (message: string): void => {
        refetchInfo();
        if (ref && "current" in ref && ref.current) ref.current.show(message);
    };

    const closeEditer = (): void => setIsEdit(false);

    const updateInfoHandler = async (): Promise<void> => {
        let isSuccessfulIconUpload: boolean = true;

        const platformsResponse = await updatePlatforms({
            platforms: selectedPlatforms
        }).unwrap().catch((err) => err);

        if (userIcon) {
            const iconResponse = await updateUserIcon({
                file: userIcon
            }).unwrap().catch((err) => err);

            if (iconResponse?.status !== 200) {
                isSuccessfulIconUpload = false;
            }
        }

        if (platformsResponse?.status === 200 && isSuccessfulIconUpload) {
            showNotification("Info was updated");
            closeEditer();
        } else if (platformsResponse?.data?.message) {
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

    const userIconChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files) {
            setUserIcon(event.target.files[0]);
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
        dispatch(setIsFetching(isLoadingPlatforms || isLoadingIcon));
    }, [isLoadingPlatforms, isLoadingIcon]);

    useEffect((): void => {
        dispatch(setIsError(isErrorPlatforms || isErrorIcon));
    }, [isErrorPlatforms, isErrorIcon]);

    return (
        <div className={styles.editerForm}>
            <h2>{userInfo.username}</h2>
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
                {plaforms.map((platfrom: IPlatform) =>
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
                )}
            </div>
            <div className={styles.editerForm__buttons}>
                <div>
                    <input
                        id="userIconInput"
                        type="file"
                        onChange={userIconChangeHandler}
                        hidden={true}
                    />
                    <label
                        className={styles.editerForm__userIconInput}
                        htmlFor="userIconInput"
                    >
                        Choose icon
                    </label>
                </div>
                <div className={styles.editerForm__actionButtons}>
                    <Button
                        title="Close"
                        onClick={closeEditer}
                    />
                    <Button
                        title="Save"
                        onClick={updateInfoHandler}
                    />
                </div>
            </div>
        </div>
    );
});

export default AccountInfoEditer;
