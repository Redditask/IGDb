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
//  оформление самого компонента "Review"
//  кнопка открыть все отзывы
//  стилистические вопросы, определить куда кнопку "add review" засунуть
//  //
//  если уже добавил отзыв к игре - то больше нельзя, вместо этого добавить кнопки редактировать (?) и удалить отзыв
//  //
//  внедрить теги в rtk-query (?)
//  //
//  отзывы, индивидуальные оценки для игр (свой рейтинг типо)
//  добавить в библиотеку аватарку и кол-во игр в списках
//  выводить в библиотеке дату добавления игры и полосой на основе этого отделять игры, сортировка по дате добавления, по оценкам и т.п.
//  //
//  улучшить дизайн
//  backgroundImage_additional вниз страницы (где будут отзывы)
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
