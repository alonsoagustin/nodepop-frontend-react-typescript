import { Advert } from "../../pages/types";

type Login = {
  type: "LOGIN";
};

type Logout = {
  type: "LOGOUT";
};

type AdvertsLoaded = {
  type: "ADVERTS_LOADED";
  payload: Advert[];
};

type AdvertsLoadedPending = {
  type: "ADVERTS_LOADED_PENDING";
};

type AdvertsLoadedFullfilled = {
  type: "ADVERTS_LOADED_FULFILLED";
  payload: { data: Advert[]; loaded: boolean };
};

type AdvertsLoadedRejected = {
  type: "ADVERTS_LOADED_REJECTED";
  payload: string;
};

type AdvertLoaded = {
  type: "ADVERT_LOADED";
};

type AdvertCreated = {
  type: "ADVERT_CREATED";
  payload: Advert;
};

type AdvertDeleted = {
  type: "ADVERT_DELETED";
  payload: number;
};

type Action =
  | Login
  | Logout
  | AdvertsLoaded
  | AdvertsLoadedPending
  | AdvertsLoadedFullfilled
  | AdvertsLoadedRejected
  | AdvertLoaded
  | AdvertCreated
  | AdvertDeleted;

export default Action;
