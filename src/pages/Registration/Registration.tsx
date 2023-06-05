import React, {useState} from "react";

import styles from "./Registration.module.scss";

import {useRegistrationMutation} from "../../API/igdbAPI";

import {NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import Button from "../../components/UI/Button/Button";
import FormInput from "../../components/UI/FormInput/FormInput";

import {RegistrationQueryArgs} from "../../types/types";

import {LOGIN_ROUTE} from "../../utils/consts";
import {registrationValidationSchema, serverErrorHandler, serverErrorIdentification} from "../../utils/helpers";

const Registration: React.FC = () => {
    const [registration] = useRegistrationMutation();
    const [serverError, setServerError] = useState<string>("");

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
            //окошко "вы успешно зарегистрировались, теперь активируйте аккаунт через письмо на почте"
            reset();
        } else if (response?.data?.message) {
            setServerError(response.data.message);
        }
    };

    return (
        <div
            className={styles.wrapper}
            style={{
                backgroundImage:
                    `linear-gradient(rgba(254, 254, 254, 0.5),rgba(254, 254, 254, 0.5)), url(${process.env["REACT_APP_BACKEND_URL"]}/images/background.jpg)`
            }}
        >
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
                        serverErrorMessage={serverErrorIdentification(serverError, "username")}
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
                        serverErrorMessage={serverErrorIdentification(serverError, "email")}
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
                        serverErrorMessage={serverErrorIdentification(serverError, "password")}
                        register={{
                            ...register("password", {
                                onChange:
                                    () => serverErrorHandler(serverError, "password", setServerError)
                            })
                        }}
                    />
                </div>
                <Button
                    title="Create your account"
                    type="submit"
                    disabled={!isValid}
                />
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
        </div>
    );
};

export default Registration;
