import State from "../state/type";

export const getIsLogged = (state: State) => state.auth;

export const getAdverts = (state: State) => state.adverts;

export const getAdvert = (advertId: string) => (state: State) =>
  state.adverts.find((advert) => advert.id === advertId);
