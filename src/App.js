import React, { Component } from 'react';
import store from './store';
import { Provider } from 'react-redux';
import './assets/global.scss';
import MainWrap from './views/MainWrap';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainWrap />
      </Provider>
    );
  }
}

export default App;
