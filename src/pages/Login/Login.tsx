import React, {useState} from "react";

import styles from "./Login.module.scss";

import {useLoginMutation} from "../../API/igdbAPI";

import {NavLink} from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [login, {isError}] = useLoginMutation();

    const loginHandler = async () => {
        if (email && password) {
            const response = await login({email, password}).unwrap();
            console.log(response);
        }
    };

    const emailHandler = (event: any): void => {
        setEmail(event.target.value);
    };

    const passwordHandler = (event: any): void => {
        setPassword(event.target.value);
    };

    return (
        <div
            className={styles.wrapper}
            style={{
                backgroundImage:
                    `linear-gradient(rgba(254, 254, 254, 0.5),rgba(254, 254, 254, 0.5)), url(${process.env["REACT_APP_BACKEND_URL"]}/images/background.jpg)`
            }}
        >
            <div className={styles.card}>
                <h2>Login</h2>
                <div className={styles.inputs}>
                    <Input
                        value={email}
                        onChange={emailHandler}
                        placeholder="Email"
                        children={<></>}
                    />
                    <Input
                        value={password}
                        onChange={passwordHandler}
                        placeholder="Password"
                        children={<></>}
                    />
                </div>
                <Button title="Login to your account" onClick={loginHandler}/>
                <div className={styles.link}>
                    <p className={styles.link__info}>Don't have account?</p>
                    <NavLink
                        className={styles.link__button}
                        to={"*registration route*"}
                    >
                        Create now!
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Login;
