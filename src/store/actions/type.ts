import { Advert } from "../../pages/types";

type AuthLoginPending = {
  type: "AUTH_LOGIN_PENDING";
};

type AuthLoginFulfilled = {
  type: "AUTH_LOGIN_FULFILLED";
};

type AuthLoginRejected = {
  type: "AUTH_LOGIN_REJECTED";
  payload: string;
};

type AuthLogout = {
  type: "AUTH_LOGOUT";
};

type ResetUi = {
  type: "RESET_UI";
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

type TagsLoaded = {
  type: "TAGS_LOADED";
};

type TagsLoadedPending = {
  type: "TAGS_LOADED_PENDING";
};

type TagsLoadedFullfilled = {
  type: "TAGS_LOADED_FULFILLED";
  payload: string[];
};

type TagsLoadedRejected = {
  type: "TAGS_LOADED_REJECTED";
  payload: string;
};

type FilterAdvertsByTag = {
  type: "FILTER_ADVERTS_BY_TAG";
  payload: string;
};

type FilterAdvertsByName = {
  type: "FILTER_ADVERTS_BY_NAME";
  payload: string;
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
  | AuthLoginPending
  | AuthLoginFulfilled
  | AuthLoginRejected
  | AuthLogout
  | ResetUi
  | AdvertsLoaded
  | AdvertsLoadedPending
  | AdvertsLoadedFullfilled
  | AdvertsLoadedRejected
  | AdvertLoaded
  | FilterAdvertsByTag
  | FilterAdvertsByName
  | TagsLoaded
  | TagsLoadedPending
  | TagsLoadedFullfilled
  | TagsLoadedRejected
  | AdvertCreated
  | AdvertDeleted;

export default Action;
