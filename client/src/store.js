import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { registerUserReducer } from './reducers/userReducer';
const reducers = combineReducers({ registerUserReducer });

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk)) || compose(applyMiddleware(thunk))
);

export default store;
