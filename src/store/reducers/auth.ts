import defaultState from "../state/defaultState";
import Action from "../actions/type";

const auth = (state = defaultState.auth, action: Action) => {
  switch (action.type) {
    case "LOGIN": {
      return true;
    }
    case "LOGOUT": {
      return false;
    }
    default: {
      return state;
    }
  }
};

export default auth;
