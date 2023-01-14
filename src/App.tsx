import React from "react";

import styles from "./App.module.scss";

import Header from "./components/Header/Header";
import AsideBar from "./components/AsideBar/AsideBar";
import Body from "./components/Body/Body";

// Ссылки в компонентах сделать через map, названия ссылок в константы
// добавить RTK store/query
// авторизация (jwt)
// анимации при наведении на ссылки

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
