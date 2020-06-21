import React, { Component } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import store from './store';
import { Provider } from 'react-redux';
import './assets/global.css';
import MainWrap from './views/MainWrap';
import './assets/theme.css';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConfigProvider locale={zhCN}>
          <MainWrap />
        </ConfigProvider>
        <div className="footer-reference">© CopyRight 2019-2020&nbsp;&nbsp;&nbsp;&nbsp;皖ICP备19011615号</div>
      </Provider>
    );
  }
}

export default App;
