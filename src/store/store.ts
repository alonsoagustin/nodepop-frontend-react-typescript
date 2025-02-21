import { combineReducers, legacy_createStore as createStore } from "redux";
import auth from "./reducers/auth";
import adverts from "./reducers/adverts";

const configureStore = () => {
  const rootReducer = combineReducers({ auth, adverts });
  const store = createStore(rootReducer);
  return store;
};

export default configureStore;
