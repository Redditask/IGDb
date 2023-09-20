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
//  v0.9
//  профили пользователей (как на rawg), придумать что будет в пустом профиле
//  индивидуальные оценки для игр
//  выбор платформ(ы) при регистрации, будет отображаться в профиле
//  кнопка подъёма в аккаунте
//  type в queries разбить на аргументы и результаты
//  в Account isError в store запихнуть и затем в AccountInfo сделать хэндлер на изменение состояния ошибки уже внутри accountInfo
//  в чужом профиле оценки игр смотреть и ревьюшки
//  ^^ и в своём тоже (слева иконка игры с ссылкой на её страницу)
//  games в Account вынести в AccountGames
//  //
//  внедрить теги в rtk-query (?)
//  //
//  v1.0
//  добавить в библиотеку аватарку
//  функция "забыл пароль"
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
