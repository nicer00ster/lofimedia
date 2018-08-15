import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import musicSaga from './sagas';
import rootReducer from './reducers';
import Router from './components/router/Router';

console.disableYellowBox = true;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(
  sagaMiddleware
));

sagaMiddleware.run(musicSaga);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  };
};
