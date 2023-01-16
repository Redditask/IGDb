import React from "react";

import styles from "./App.module.scss";

import Header from "./components/Header/Header";
import AsideBar from "./components/AsideBar/AsideBar";
import Body from "./components/Body/Body";

// ToDo:
//  Ссылки в компонентах сделать через map, названия ссылок в константы, добавить роутинг
//  Query:
//    больше запросов
//  авторизация (jwt)
//  анимации при наведении на ссылки
//  лоадер добавить
//  в Home будут популярные игры
//  Ленивая загрузка компонентов
//  цвета помягче, вместо круга прямоугольник

const App: React.FC = () => {
  return (
    <div className={styles.App}>
        <Header/>
        <div className={styles.App__body}>
            <AsideBar/>
            <Body/>
        </div>
    </div>
  );
}

export default App;
