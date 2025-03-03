import Action from "../actions/type";
import defaultState from "../state/defaultState";

const tags = (state = defaultState.tags, action: Action) => {
  switch (action.type) {
    case "AUTH_LOGOUT": {
      return { ...state, data: [], loaded: false };
    }
    case "TAGS_LOADED_FULFILLED": {
      return {
        ...state,
        data: action.payload.data,
        loaded: action.payload.loaded,
      };
    }
    default: {
      return state;
    }
  }
};

export default tags;
