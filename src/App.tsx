import React, {useEffect} from "react";

import styles from "./App.module.scss";

import {Provider} from "react-redux";

import {useCheckAuthQuery} from "./API/igdbAPI";
import store from "./store";

import {useAppDispatch} from "./hooks";
import {clearUser, setIsChecked, setIsFetching, setUser} from "./store/userSlice";

import AppRouter from "./routing/AppRouter";

import {initialUserDataState} from "./utils/helpers/initialStates";

// ToDo:
//  v0.8
//  стили привести к одному порядку (бэм), проверить на одинаковость стилей
//  //
//  v0.9
//  профили пользователей (как на rawg), придумать что будет в пустом профиле
//  индивидуальные оценки для игр
//  количество отзывов/оценок, кол-во игр в библиотеке
//  выбор платформ(ы) при регистрации, будет отображаться в профиле
//  //
//  внедрить теги в rtk-query (?)
//  //
//  v1.0
//  добавить в библиотеку аватарку
//  выводить в библиотеке дату добавления игры и полосой на основе этого отделять игры, сортировка по дате добавления, по оценкам и т.п.
//  функция "забыл пароль"
//  //
//  улучшить дизайн
//  темная тема в header где-нибудь
//  //
//  добавить какие-то доп. фильтры, если позволяет API

const App: React.FC = () => {
    const dispatch = useAppDispatch();

    const {
        data: response = initialUserDataState,
        isError,
        isFetching
    } = useCheckAuthQuery({}, {
        skip: !localStorage.getItem("token"),
        refetchOnMountOrArgChange: true
    });

    useEffect((): void => {
        if (response.user.username.length){
            dispatch(setUser(response.user));
        } else if (isError) {
            dispatch(clearUser());
        }

        dispatch(setIsChecked(isFetching));
        dispatch(setIsFetching(isFetching));
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
