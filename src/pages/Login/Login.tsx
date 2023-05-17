import React from "react";

import styles from "./Login.module.scss";

import {useLoginMutation} from "../../API/igdbAPI";

import {NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';

import Button from "../../components/UI/Button/Button";

import {LoginQueryArgs} from "../../types/types";

import {REGISTRATION_ROUTE} from "../../utils/consts";
import {loginValidationSchema} from "../../utils/helpers";

const Login: React.FC = () => {
    const [login, {isError}] = useLoginMutation();

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm<LoginQueryArgs>({
        resolver: yupResolver(loginValidationSchema),
    });

    const loginHandler = async (data: LoginQueryArgs): Promise<void> => {
        const response = await login({email: data.email, password: data.password}).unwrap();
        console.log(response);
    };

    return (
        <div
            className={styles.wrapper}
            style={{
                backgroundImage:
                    `linear-gradient(rgba(254, 254, 254, 0.5),rgba(254, 254, 254, 0.5)), url(${process.env["REACT_APP_BACKEND_URL"]}/images/background.jpg)`
            }}
        >
            <form className={styles.card} onSubmit={handleSubmit(loginHandler)}>
                <h2>Login</h2>
                <div className={styles.inputs}>
                    <div className={styles.inputWrapper}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Email"
                            {...register("email")}
                        />
                    </div>
                    {
                        errors?.email?.message
                        &&
                        <h5 className={styles.errorMessage}>
                            {String(errors?.email?.message)}
                        </h5>
                    }
                    <div className={styles.inputWrapper}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Password"
                            {...register("password")}
                        />
                    </div>
                    {
                        errors?.password?.message
                        &&
                        <h5 className={styles.errorMessage}>
                            {String(errors?.password?.message)}
                        </h5>
                    }
                </div>
                <Button
                    title="Login to your account"
                    type="submit"
                />
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
