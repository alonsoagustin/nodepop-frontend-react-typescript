import defaultState from "../state/defaultState";
import Action from "../actions/type";

const ui = (state = defaultState.ui, action: Action) => {
  switch (action.type) {
    case "ADVERTS_LOADED_PENDING": {
      return { error: null, loading: true };
    }
    case "ADVERTS_LOADED_FULFILLED": {
      return { error: null, loading: false };
    }
    case "ADVERTS_LOADED_REJECTED": {
      return { error: action.payload, loading: false };
    }
    default:
      return state;
  }
};

export default ui;
