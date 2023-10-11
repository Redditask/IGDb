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
//  профили пользователей (как на rawg)
//  средняя оценка игр пользователя (цветом как metacritic выделять)
//  в чужом профиле оценки игр смотреть и ревьюшки (user haven't write reviews или чет такое)
//  ^^ и в своём тоже (слева иконка игры с ссылкой на её страницу, справа отзыв)
//  ревьюшки в виде карусели (?) или вынести library и оставить список
//  скелетоны для компонентов в Account
//  фильтр ревьюшек по рейтингу
//  //
//  v0.95
//  вынести игры в library (новая страница, отдельная от Account (и от ревьюшек))
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
