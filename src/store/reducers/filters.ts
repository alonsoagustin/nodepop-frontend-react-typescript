import Action from "../actions/type";
import defaultState from "../state/defaultState";

const filters = (state = defaultState.filters, action: Action) => {
  switch (action.type) {
    case "FILTER_ADVERTS_BY_TAG":
      return {
        ...state,
        tags: state.tags.includes(action.payload)
          ? state.tags.filter((tag) => tag !== action.payload)
          : [...state.tags, action.payload],
      };
    default:
      return state;
  }
};

export default filters;
