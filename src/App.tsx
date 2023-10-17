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
//  if/else, ? : зарефакторить
//  декомпозиция компонентов
//  ^ (пройтись по всем компонентам) ^
//  //
//  фильтр ревьюшек по рейтингу (^ и v)
//  //
//  v0.95
//  динамическая подгрузка ревьюшек (как с играми в Games page) (?)
//  внедрить теги в rtk-query (?)
//  добавить в библиотеку аватарку
//  выбор платформы при написании отзыва (?)
//  возвращение позиции скролла при переходе на -1 страницу
//  //
//  v1.0
//  функция "друзья" (?)
//  функция "забыл пароль"
//  темная тема
//  //
//  v1.1
//  переработать поиск (как на ютубе?)
//  поиск user-ов
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
