import State from "./type";

const defaultState: State = {
  auth: false,
  adverts: { data: [], loaded: false },
  tags: { data: [], loaded: false },
  filters: { tags: [], name: "" },
  ui: { error: null, loading: false },
};

export default defaultState;
