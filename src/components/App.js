import React from "react";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { configureStore } from "../store/configureStore";
import theme from "../theme";
import MainContainer from "../containers/MainContainer";

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <MainContainer />
    </ThemeProvider>
  </Provider>
);

export default App;
