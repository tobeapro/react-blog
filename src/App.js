import React, { Component } from 'react';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import store from './store';
import { Provider } from 'react-redux';
import './assets/global.scss';
import MainWrap from './views/MainWrap';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LocaleProvider locale={zhCN}>
          <MainWrap />
        </LocaleProvider>
      </Provider>
    );
  }
}

export default App;
