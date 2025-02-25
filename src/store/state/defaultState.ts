import State from "./type";

const defaultState: State = {
  auth: false,
  adverts: { data: [], loaded: false },
  ui: { error: null, loading: false },
};

export default defaultState;
