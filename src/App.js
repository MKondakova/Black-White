import React from "react";
import './scss/main.scss'
import { Provider } from "react-redux";
import { createReduxStore } from "./store";
import Routes from './routes';
export const store = createReduxStore();

const App = () => {

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
