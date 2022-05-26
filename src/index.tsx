/*
 * @Author: Shen Shu
 * @Date: 2022-05-17 14:08:10
 * @LastEditors: 李佳修
 * @LastEditTime: 2022-05-21 14:49:00
 * @FilePath: /uwcssa_ca/frontend/src/index.tsx
 * @Description:
 *
 */

import Amplify from 'aws-amplify';
import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import config from './aws-exports';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store';
import Message from 'components/Message';

function getUri() {
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:3000/';
  } else if (window.location.hostname === 'devts.uwcssa.ca') {
    return 'https://devts.uwcssa.ca/';
  }
}

const updatedAwsConfig = {
  ...config,
  oauth: {
    ...config.oauth,
    redirectSignIn: getUri(),
    redirectSignOut: getUri(),
  },
};

Amplify.configure(updatedAwsConfig);

ReactDOM.render(
  <Provider store={store}>
    <Message>
      <App />
    </Message>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();