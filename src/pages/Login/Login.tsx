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
            style={{backgroundImage: "url(https://media.istockphoto.com/id/1243194025/vector/gamepad-joypad-linear-icon-set-gamepads-video-game-controller-line-with-editable-stroke.jpg?s=612x612&w=0&k=20&c=IP-vPk-cVjWHZRmIJOqHn8giO_aAEtG4XkgYX6_Kees=)"}}
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
