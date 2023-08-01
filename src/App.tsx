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
//  общий рефакторинг кода
//  проверить выполняют ли все компоненты только своё назначение, чтобы было без лишнего функционала
//  одинаковые интерфейсы объединить под одним общим концептуальным (MessageQueryResult и т.п.)
//  модальное окно на различные подтверждения (например, вы точно хотите удалить отзыв? и т.п.)
//  //
//  дата добавления отзыва (использовать dateFormatting), лайки дизлайки к отзыву
//  //
//  внедрить теги в rtk-query (?)
//  //
//  индивидуальные оценки для игр
//  добавить в библиотеку аватарку и кол-во игр в списках
//  выводить в библиотеке дату добавления игры и полосой на основе этого отделять игры, сортировка по дате добавления, по оценкам и т.п.
//  //
//  улучшить дизайн
//  темная тема в header где-нибудь
//  //
//  профили пользователей (как на rawg)
//  функция "забыл пароль"
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
