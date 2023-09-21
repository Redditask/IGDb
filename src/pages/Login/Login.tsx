import React, {useEffect, useState} from "react";

import styles from "./Login.module.scss";

import {useLoginMutation} from "../../API/igdbAPI";

import {NavLink, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';

import Button from "../../components/UI/Button/Button";
import FormInput from "../../components/UI/FormInput/FormInput";
import RegularLoader from "../../components/UI/RegularLoader/RegularLoader";

import {REGISTRATION_ROUTE} from "../../utils/consts";
import {loginValidationSchema, serverErrorValidation} from "../../utils/helpers/validation";
import {serverErrorHandler} from "../../utils/helpers/dataProcessing";

import {useAppDispatch} from "../../hooks";
import {setUser, setIsFetching} from "../../store/userSlice";

import {LoginQueryArgs} from "../../types/queries/args";

const Login: React.FC = () => {
    const [login, {isLoading}] = useLoginMutation();
    const [serverError, setServerError] = useState<string>("");

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
    } = useForm<LoginQueryArgs>({
        mode: "onChange",
        resolver: yupResolver(loginValidationSchema),
    });

    const loginHandler = async (data: LoginQueryArgs): Promise<void> => {
        const response = await login({
            email: data.email,
            password: data.password
        }).unwrap().catch((err) => err);

        if (response?.user?.username?.length) {
            dispatch(setUser(response.user));
            navigate(-1);
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
            <form
                className={styles.card}
                onSubmit={handleSubmit(loginHandler)}
            >
                <h2>Login</h2>
                <div className={styles.inputs}>
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
                            title="Login to your account"
                            type="submit"
                            disabled={!isValid}
                        />
                        :
                        <RegularLoader/>
                }
                <div className={styles.link}>
                    <p className={styles.link__info}>Don't have account?</p>
                    <NavLink
                        className={styles.link__button}
                        to={REGISTRATION_ROUTE}
                    >
                        Create now!
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default Login;
