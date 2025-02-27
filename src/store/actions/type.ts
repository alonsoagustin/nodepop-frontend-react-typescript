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
  | Login
  | Logout
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
