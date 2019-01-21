import 'materialize-css/dist/css/materialize.min.css';
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';


const store = createStore(reducers, {}, applyMiddleware(reduxThunk));



ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);

//console.log('Stripe KEY = ', process.env.REACT_APP_STRIPE_KEY);
//console.log('Environment = ', process.env.NODE_ENV);
