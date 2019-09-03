import React, { Component } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import store from './store';
import { Provider } from 'react-redux';
import './assets/global.css';
import MainWrap from './views/MainWrap';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConfigProvider locale={zhCN}>
          <MainWrap />
        </ConfigProvider>
      </Provider>
    );
  }
}

export default App;
