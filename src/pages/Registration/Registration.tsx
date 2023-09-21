import React, {useEffect, useState} from "react";

import styles from "./Registration.module.scss";

import {useRegistrationMutation} from "../../API/igdbAPI";

import {NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import Button from "../../components/UI/Button/Button";
import FormInput from "../../components/UI/FormInput/FormInput";
import RegularLoader from "../../components/UI/RegularLoader/RegularLoader";

import {setIsFetching} from "../../store/userSlice";
import {useAppDispatch} from "../../hooks";

import {LOGIN_ROUTE} from "../../utils/consts";
import {registrationValidationSchema, serverErrorValidation} from "../../utils/helpers/validation";
import {serverErrorHandler} from "../../utils/helpers/dataProcessing";

import {RegistrationQueryArgs} from "../../types/queries/args";

const Registration: React.FC = () => {
    const [registration, {isLoading}] = useRegistrationMutation();
    const [serverError, setServerError] = useState<string>("");
    const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        reset
    } = useForm<RegistrationQueryArgs>({
        mode: "onChange",
        resolver: yupResolver(registrationValidationSchema),
    });

    const registrationHandler = async (data: RegistrationQueryArgs): Promise<void> => {
        const response = await registration({
            email: data.email,
            password: data.password,
            username: data.username
        }).unwrap().catch((err) => err);

        if (response?.user?.username?.length) {
            setIsSuccessful(true);
            reset();
        } else if (response?.data?.message) {
            setServerError(response.data.message);
        }
    };

    useEffect((): void => {
        dispatch(setIsFetching(isLoading));
    }, [isLoading]);

    return (
        <div
            className={styles.wrapper}
            style={{
                backgroundImage:
                    `linear-gradient(rgba(254, 254, 254, 0.5),rgba(254, 254, 254, 0.5)), url(${process.env["REACT_APP_BACKEND_URL"]}/images/background.jpg)`
            }}
        >
            {
                !isSuccessful
                    ?
                    <form
                        className={styles.card}
                        onSubmit={handleSubmit(registrationHandler)}
                    >
                        <h2>Registration</h2>
                        <div className={styles.inputs}>
                            <FormInput
                                placeholderText="Username"
                                type="text"
                                formErrorMessage={errors?.username?.message}
                                serverErrorMessage={serverErrorValidation(serverError, "username")}
                                register={{
                                    ...register("username", {
                                        onChange:
                                            () => serverErrorHandler(serverError, "username", setServerError)
                                    })
                                }}
                            />
                            <FormInput
                                placeholderText="Email"
                                type="text"
                                formErrorMessage={errors?.email?.message}
                                serverErrorMessage={serverErrorValidation(serverError, "email")}
                                register={{
                                    ...register("email", {
                                        onChange:
                                            () => serverErrorHandler(serverError, "email", setServerError)
                                    })
                                }}
                            />
                            <FormInput
                                placeholderText="Password"
                                type="password"
                                formErrorMessage={errors?.password?.message}
                                serverErrorMessage={serverErrorValidation(serverError, "password")}
                                register={{
                                    ...register("password", {
                                        onChange:
                                            () => serverErrorHandler(serverError, "password", setServerError)
                                    })
                                }}
                            />
                        </div>
                        {
                            !isLoading
                                ?
                                <Button
                                    title="Create your account"
                                    type="submit"
                                    disabled={!isValid}
                                />
                                :
                                <RegularLoader/>
                        }
                        <div className={styles.link}>
                            <p className={styles.link__info}>Already have an account?</p>
                            <NavLink
                                className={styles.link__button}
                                to={LOGIN_ROUTE}
                            >
                                Login now!
                            </NavLink>
                        </div>
                    </form>
                    :
                    <div className={styles.card}>
                        <h2>Success!</h2>
                        <div className={styles.successfulRegistrationText}>
                            <p>You have successfully registered</p>
                            <p>Now check you email to activate account on link in message</p>
                            <br/>
                            <div className={styles.link}>
                                <p>After activation you can</p>
                                <NavLink
                                    className={styles.link__button}
                                    to={LOGIN_ROUTE}
                                >
                                    Login to your account
                                </NavLink>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Registration;
