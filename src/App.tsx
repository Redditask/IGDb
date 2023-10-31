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
//  v0.95
//  динамическая подгрузка ревьюшек (как с играми в Games page) (?)
//  добавить в библиотеку аватарку
//  карусель на GamePage
//  //
//  v1.0
//  функция "друзья" (?)
//  функция "забыл пароль"
//  адаптивный дизайн
//  //
//  v1.1
//  тесты
//  темная тема
//  переработать поиск (как на ютубе?)
//  поиск user-ов

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
        if (response.user.username.length) {
            dispatch(setUser(response.user));
        } else if (isError) {
            dispatch(clearUser());
        }

        dispatch(setIsChecked(isFetching));
        dispatch(setIsFetching(isFetching));
    }, [response, isError, isFetching]);

    return (
        <div className={styles}>
            <Provider store={store}>
                <AppRouter/>
            </Provider>
        </div>
    );
};

export default App;
