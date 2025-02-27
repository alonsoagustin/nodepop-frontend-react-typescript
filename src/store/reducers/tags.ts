import Action from "../actions/type";
import defaultState from "../state/defaultState";

const tags = (state = defaultState.tags, action: Action) => {
  switch (action.type) {
    case "TAGS_LOADED_FULFILLED": {
      return {
        ...state,
        data: action.payload,
        loaded: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default tags;
