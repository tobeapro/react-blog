import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import './assets/global.scss';
import MainWrap from './views/MainWrap';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
              <Route path='/' component={MainWrap} />
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
