import React from "react";

import styles from "./Login.module.scss";

import {useLoginMutation} from "../../API/igdbAPI";

import {NavLink, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';

import Button from "../../components/UI/Button/Button";
import FormInput from "../../components/UI/FormInput/FormInput";

import {LoginQueryArgs} from "../../types/types";

import {REGISTRATION_ROUTE} from "../../utils/consts";
import {loginValidationSchema} from "../../utils/helpers";
import {useAppDispatch} from "../../hooks";
import {setUser} from "../../store/userSlice";

const Login: React.FC = () => {
    const [login, {isError}] = useLoginMutation();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm<LoginQueryArgs>({
        resolver: yupResolver(loginValidationSchema),
    });

    const loginHandler = async (data: LoginQueryArgs): Promise<void> => {
        const response = await login({email: data.email, password: data.password}).unwrap();
        if (response.user.username.length) {
            dispatch(setUser(response.user));
            navigate("/");
        }
        //окошко (вы успешно авторизовались)
        //и обработать, если ошибка будет
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
            <form
                className={styles.card}
                onSubmit={handleSubmit(loginHandler)}
                autoComplete="off"
            >
                <h2>Login</h2>
                <div className={styles.inputs}>
                    <FormInput
                        placeholderText="Email"
                        errorMessage={errors?.email?.message}
                        register={{...register("email")}}
                    />
                    <FormInput
                        placeholderText="Password"
                        errorMessage={errors?.password?.message}
                        register={{...register("password")}}
                    />
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
