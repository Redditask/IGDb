import React, {useEffect} from "react";

import styles from "./App.module.scss";

import {Provider} from "react-redux";

import {useCheckAuthQuery} from "./API/igdbAPI";
import store from "./store";

import {useAppDispatch} from "./hooks";
import {setUser} from "./store/userSlice";

import AppRouter from "./routing/AppRouter";

import {initialUserDataState} from "./utils/helpers";

// ToDo:
//  какой-то скелетон в Header (момент checkAuth запроса)
//  модальное окно при клике регистрации с сообщением проверить почту для подтверждения регистрации (для isError и т.п.)
//  связать всё это с бекендом
//  //
//  переработать поиск
//  отзывы, индивидуальные оценки для игр (свой рейтинг типо)
//  ссылка на покупку в steam и т.п. (если есть в rawgAPI)
//  рейтинг игры (esrb ?)
//  темная тема в header где-нибудь
//  //
//  добавить страницу для активации
//  //
//  свой бекенд
//  авторизация (jwt)
//  добавить в библиотеку аватарку и кол-во игр в списках
//  выводить в библиотеке дату добавления игры и полоской вот так игры отделять
//  (потом добавить какие-то фильтры, поиск (?))

const App: React.FC = () => {
    const dispatch = useAppDispatch();

    const {
        data: response = initialUserDataState,
        error: checkAuthError
    } = useCheckAuthQuery({}, {
        skip: !localStorage.getItem("token"),
        refetchOnMountOrArgChange: true
    });

    useEffect(()=>{
        if (response.user.username.length){
            dispatch(setUser(response.user))
        }
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
