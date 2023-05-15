import React, {useState} from "react";

import styles from "./Registration.module.scss";

import {useRegistrationMutation} from "../../API/igdbAPI";

import {NavLink} from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

import {LOGIN_ROUTE} from "../../utils/consts";

const Registration: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [registration, {isError}] = useRegistrationMutation();

    const registrationHandler = async (): Promise<void> => {
        if(username && email && password){
            const response = await registration({email, password, username}).unwrap();
            console.log(response);
        }
    };

    const usernameHandler = (event: any): void => {
        setUsername(event.target.value);
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
                <h2>Registration</h2>
                <div className={styles.inputs}>
                    <Input
                        value={username}
                        onChange={usernameHandler}
                        placeholder="Username"
                        children={<></>}
                    />
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
                <Button title="Create your account" onClick={registrationHandler}/>
                <div className={styles.link}>
                    <p className={styles.link__info}>Already have an account?</p>
                    <NavLink
                        className={styles.link__button}
                        to={LOGIN_ROUTE}
                    >
                        Login now!
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Registration;
