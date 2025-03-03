import defaultState from "../state/defaultState";
import Action from "../actions/type";

const adverts = (state = defaultState.adverts, action: Action) => {
  switch (action.type) {
    case "AUTH_LOGOUT": {
      return { ...state, data: [], loaded: false };
    }
    case "ADVERTS_LOADED_FULFILLED": {
      return {
        ...state,
        data: action.payload.data,
        loaded: action.payload.loaded,
      };
    }
    case "ADVERT_DELETED_FULFILLED": {
      return {
        ...state,
        data: state.data.filter((advert) => advert.id !== action.payload.id),
      };
    }
    case "ADVERT_CREATED_FULFILLED": {
      return { ...state, data: [...state.data, action.payload] };
    }
    default: {
      return state;
    }
  }
};

export default adverts;
