import defaultState from "../state/defaultState";
import Action from "../actions/type";

const adverts = (state = defaultState.adverts, action: Action) => {
  switch (action.type) {
    case "ADVERTS_LOADED": {
      return action.payload;
    }
    case "ADVERT_CREATED": {
      return [...state, action.payload];
    }
    case "ADVERT_DELETED": {
      return state.filter((advert) => Number(advert.id) !== action.payload);
    }
    default: {
      return state;
    }
  }
};

export default adverts;
