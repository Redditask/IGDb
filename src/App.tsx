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
//  добавить что-то вместо howlongtobeat
//  провести инспекцию и рефакторинг кода (пройтись по всему коду и исправить/зарефакторить)
//  где надо, расставить типы (: void) и т.п.
//  useEffect, memo и useCallback !!!
//  checkAuthError в App, libary/wishlistError в Library (если надо, то в store закинуть и вывести something go wrong)
//  ^ что-то с этим сделать ^
//  listenerMiddleware как-то объединить
//  //
//  модальное окно при клике регистрации с сообщением проверить почту для подтверждения регистрации
//  модальное окно "вы точно хотите выйти?"
//  вместо Library будет ник (с аватаркой?), (переименовать Library в Account и роуты поменять (?))
//  функционал add to wishlist/to library,
//  ^ а если пользователь не авторизован (по stor-у наверное определять, кнопки будут disabled и написано маленьким текстом - "(!) вам необходимо авторизоваться"
//  ^^^ и также с отзывами и своими оценкам на игры ^^^
//  стили (+ размер картинок в search, какой-то фон в something go wrong)
//  //
//  отзывы, индивидуальные оценки для игр (свой рейтинг типо)
//  ссылка на покупку в steam и т.п. (если есть в rawgAPI)
//  рейтинг игры (esrb ?)
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
