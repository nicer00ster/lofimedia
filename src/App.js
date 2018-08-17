import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';
import rootReducer from './reducers';
import Router from './components/router/Router';

// Uncomment in production
console.disableYellowBox = true;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(
  sagaMiddleware
));

sagaMiddleware.run(rootSaga);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  };
};
