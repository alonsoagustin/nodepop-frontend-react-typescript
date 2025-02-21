import { combineReducers, legacy_createStore as createStore } from "redux";
import auth from "./reducers/auth";
import adverts from "./reducers/adverts";
import State from "./state/type";

// Define the store configuration function with the initial state
// The function takes a partial state as an argument and returns a store
const configureStore = (preloadedState: Partial<State>) => {
  const rootReducer = combineReducers({ auth, adverts });
  const store = createStore(
    rootReducer, // Combine the reducers
    preloadedState as never // Create the store with the initial state
  );
  return store;
};

export default configureStore;
