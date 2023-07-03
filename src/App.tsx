import React, {useEffect} from "react";

import styles from "./App.module.scss";

import {Provider} from "react-redux";

import {useCheckAuthQuery} from "./API/igdbAPI";
import store from "./store";

import {useAppDispatch} from "./hooks";
import {clearUser, setIsChecked, setUser} from "./store/userSlice";

import AppRouter from "./routing/AppRouter";


import {initialUserDataState} from "./utils/helpers/initialStates";

// ToDo:
//  добавить что-то вместо howlongtobeat
//  //
//  dlc и sameSeries убрать из useState, сделать кастомный хук из useEffect (?) или вынести всё в AdditionalItem
//  кружочек загрузки на странице Game при нажатии на кнопки
//  //
//  улучшить дизайн (при клике какое-то выезжающее окошко сделать), карусель со списком игр в Game Page (?)
//  //
//  отзывы, индивидуальные оценки для игр (свой рейтинг типо)
//  ссылка на покупку в steam и т.п. (если есть в rawgAPI)
//  возрастной рейтинг игры (esrb ?)
//  добавить в библиотеку аватарку и кол-во игр в списках
//  выводить в библиотеке дату добавления игры и полосой на основе этого отделять игры, сортировка по дате добавления, по оценкам и т.п.
//  //
//  добавить страницу для активации (и там если что обработка ошибки invalid link)
//  //
//  темная тема в header где-нибудь
//  (потом добавить какие-то фильтры, если позволяет API)

const App: React.FC = () => {
    const dispatch = useAppDispatch();

    const {
        data: response = initialUserDataState,
        isError,
        isLoading
    } = useCheckAuthQuery({}, {
        skip: !localStorage.getItem("token"),
        refetchOnMountOrArgChange: true
    });

    useEffect((): void=>{
        if (response.user.username.length){
            dispatch(setUser(response.user));
        } else if (isError) {
            dispatch(clearUser());
        }

        dispatch(setIsChecked(isLoading));
    }, [response, isError]);

    return (
        <div className={styles}>
            <Provider store={store}>
                <AppRouter/>
            </Provider>
        </div>
    );
};

export default App;
