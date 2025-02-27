import {
  compose,
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
  Action,
} from "redux";
import auth from "./reducers/auth";
import adverts from "./reducers/adverts";
import tags from "./reducers/tags";
import ui from "./reducers/ui";
import State from "./state/type";
import { useDispatch, useSelector } from "react-redux";
import * as thunk from "redux-thunk";
import filters from "./reducers/filters";

// Extend the Window interface to include the Redux DevTools extension
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
  }
}

// Define the store configuration function with the initial state
// The function takes a partial state as an argument and returns a store
const configureStore = (preloadedState: Partial<State>) => {
  // Use the Redux DevTools extension if it is installed
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const rootReducer = combineReducers({ auth, adverts, tags, filters, ui });
  const store = createStore(
    rootReducer, // Combine the reducers
    preloadedState as never, // Create the store with the initial state
    composeEnhancers(applyMiddleware(thunk.withExtraArgument<State, Action>())) // Use the Redux DevTools extension
  );
  return store;
};

export type AppStore = ReturnType<typeof configureStore>;
export type AppGetState = AppStore["getState"];
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppGetState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export type AppThunk<ReturnType = void> = thunk.ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

export default configureStore;
