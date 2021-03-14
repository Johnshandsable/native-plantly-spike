import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

/* Import App */
import App from './components/App/App';
import './index.css';

const getPlants = function* (action) {
  try {
    // gets data from server
    const response = yield axios.get('/api/plant-details');

    console.log('SAGAS - response', response.data);

    yield put({
      type: 'SET_PLANTS',
      payload: response.data,
    });
  } catch (err) {
    console.error(err);
  }
}; // end getFavorite

function* rootSaga() {
  // listen for this and do function
  yield takeEvery('GET_PLANTS', getPlants);
} // end rootSaga

const sagaMiddleware = createSagaMiddleware();

//  reducers
const plantReducer = (state = [], action) => {
  console.log('Reducer - ', action.payload);
  switch (action.type) {
    case 'SET_PLANTS':
      return action.payload;
    default:
      return state;
  }
};

const store = createStore(
  combineReducers({
    plantReducer,
  }),
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
