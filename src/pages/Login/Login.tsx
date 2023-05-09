import React, {useState} from "react";

import styles from "./Login.module.scss";

import {useLoginMutation} from "../../API/igdbAPI";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

const Login = () => {
    //пока в роли заглушки
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
        <div className={styles.login}>
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
            <Button title="login" onClick={loginHandler}/>
        </div>
    );
};

export default Login;
