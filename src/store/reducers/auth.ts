import defaultState from "../state/defaultState";
import Action from "../actions/type";

const auth = (state = defaultState.auth, action: Action) => {
  switch (action.type) {
    case "AUTH_LOGIN_FULFILLED": {
      return true;
    }
    case "AUTH_LOGOUT": {
      return false;
    }
    default: {
      return state;
    }
  }
};

export default auth;
