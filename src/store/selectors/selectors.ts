import State from "../state/type";

export const getIsLogged = (state: State) => state.auth;

export const getAdverts = (state: State) => state.adverts;

export const getAdvert = (advertId: string) => (state: State) =>
  state.adverts.data.find((advert) => advert.id === advertId);

export const getTags = (state: State) => state.tags;

export const getFilters = (state: State) => state.filters;

export const getUi = (state: State) => state.ui;
