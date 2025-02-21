import {
  compose,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import auth from "./reducers/auth";
import adverts from "./reducers/adverts";
import State from "./state/type";

// Extend the Window interface to include the Redux DevTools extension
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// Define the store configuration function with the initial state
// The function takes a partial state as an argument and returns a store
const configureStore = (preloadedState: Partial<State>) => {
  // Use the Redux DevTools extension if it is installed
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const rootReducer = combineReducers({ auth, adverts });
  const store = createStore(
    rootReducer, // Combine the reducers
    preloadedState as never, // Create the store with the initial state
    composeEnhancers() // Use the Redux DevTools extension
  );
  return store;
};

export default configureStore;
