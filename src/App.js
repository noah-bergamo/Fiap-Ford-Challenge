import React from "react";
import Routes from "./routes";
import { store } from "./redux/stores/store";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
      <Toast />
    </Provider>
  );
};

export default App;
