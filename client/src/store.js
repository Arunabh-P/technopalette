import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  registerUserReducer,
  loginUserReducer,
  updateProfileReducer,
} from './reducers/userReducer';
import {
  loginAdminrReducer,
  getAllUsersReducer,
} from './reducers/adminReducer';
const reducers = combineReducers({
  registerUserReducer,
  updateProfileReducer,
  loginUserReducer,
  loginAdminrReducer,
  getAllUsersReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk)) || compose(applyMiddleware(thunk))
);

export default store;
