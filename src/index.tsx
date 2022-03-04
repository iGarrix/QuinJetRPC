import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './scrollbar.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { store } from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AuthUser } from './store/reducers/identityReducer/actions';


const token : string = localStorage.token;
if(token) {
  AuthUser(token, store.dispatch);
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
