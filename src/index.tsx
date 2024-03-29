import React from "react";
import ReactDOM from "react-dom/client";

import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";

import App from "./App";

import {store, persistor} from "./store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
      <PersistGate persistor={persistor}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </PersistGate>
  </Provider>
);

