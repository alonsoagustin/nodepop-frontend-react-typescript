import defaultState from "../state/defaultState";
import Action from "../actions/type";

const ui = (state = defaultState.ui, action: Action) => {
  switch (action.type) {
    case "AUTH_LOGIN_PENDING": {
      return { ...state, error: null, loading: true };
    }
    case "ADVERTS_LOADED_PENDING": {
      return { ...state, error: null, loading: true };
    }
    case "TAGS_LOADED_PENDING": {
      return { ...state, error: null, loading: true };
    }
    case "ADVERT_DELETED_PENDING": {
      return { ...state, error: null, loading: true };
    }
    case "AUTH_LOGIN_FULFILLED": {
      return { ...state, error: null, loading: false };
    }
    case "ADVERTS_LOADED_FULFILLED": {
      return { ...state, error: null, loading: false };
    }
    case "TAGS_LOADED_FULFILLED": {
      return { ...state, error: null, loading: false };
    }
    case "ADVERT_DELETED_FULFILLED": {
      return { ...state, error: null, loading: false };
    }
    case "AUTH_LOGIN_REJECTED": {
      return { ...state, error: action.payload, loading: false };
    }
    case "ADVERTS_LOADED_REJECTED": {
      return { ...state, error: action.payload, loading: false };
    }
    case "TAGS_LOADED_REJECTED": {
      return { ...state, error: action.payload, loading: false };
    }
    case "ADVERT_DELETED_REJECTED": {
      return { ...state, error: action.payload, loading: false };
    }
    case "RESET_UI": {
      return { ...state, error: null, loading: false };
    }
    default:
      return state;
  }
};

export default ui;
