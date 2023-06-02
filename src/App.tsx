import React, {useEffect} from "react";

import styles from "./App.module.scss";

import {Provider} from "react-redux";

import {useCheckAuthQuery} from "./API/igdbAPI";
import store from "./store";

import {useAppDispatch} from "./hooks";
import {setIsChecked, setUser} from "./store/userSlice";

import AppRouter from "./routing/AppRouter";

import {initialUserDataState} from "./utils/helpers";

// ToDo:
//  модальное окно при клике регистрации с сообщением проверить почту для подтверждения регистрации (для isError и т.п.)
//  модальное окно "вы точно хотите выйти?"
//  вместо Library будет ник (с аватаркой?)
//  remember me при логине
//  //
//  отзывы, индивидуальные оценки для игр (свой рейтинг типо)
//  ссылка на покупку в steam и т.п. (если есть в rawgAPI)
//  рейтинг игры (esrb ?)
//  добавить в библиотеку аватарку и кол-во игр в списках
//  выводить в библиотеке дату добавления игры и полосой на основе этого отделять игры
//  //
//  добавить страницу для активации
//  //
//  темная тема в header где-нибудь
//  (потом добавить какие-то фильтры, поиск (?))

const App: React.FC = () => {
    const dispatch = useAppDispatch();

    const {
        data: response = initialUserDataState,
        error: checkAuthError,
        isLoading
    } = useCheckAuthQuery({}, {
        skip: !localStorage.getItem("token"),
        refetchOnMountOrArgChange: true
    });

    useEffect(()=>{
        if (response.user.username.length){
            dispatch(setUser(response.user));
        }

        dispatch(setIsChecked(isLoading));
    }, [response]);

    return (
        <div className={styles}>
            <Provider store={store}>
                <AppRouter/>
            </Provider>
        </div>
    );
};

export default App;
