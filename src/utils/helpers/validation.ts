import * as Yup from "yup";

import {IPlatform} from "../../types/data";

export const platformValidation = (platformsArray: IPlatform[], platform: string): boolean => {
    let isOnPlatform: boolean = false;

    platformsArray.forEach((item: IPlatform): void => {
        if (item.platform.name.includes(platform)) isOnPlatform = true;
    });

    return isOnPlatform;
};

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
    password: Yup.string()
        .required("Password is required")
        .min(4, "Password must be at least 4 characters")
        .max(32, "Password must not exceed 32 characters"),
});

export const registrationValidationSchema = Yup.object().shape({
    username: Yup.string()
        .required("Username is required")
        .min(5, "Username must be at least 5 characters")
        .max(14, "Username must not exceed 14 characters"),
    email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
    password: Yup.string()
        .required("Password is required")
        .min(4, "Password must be at least 4 characters")
        .max(32, "Password must not exceed 32 characters"),
});

export const serverErrorValidation = (error: string, errorType: string): string | null =>
    error.toLowerCase().includes(errorType) ? error : null;
