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

type AdvertCreated = {
  type: "ADVERT_CREATED";
  payload: Advert;
};

type AdvertDeleted = {
  type: "ADVERT_DELETED";
  payload: number;
};

type Action = Login | Logout | AdvertsLoaded | AdvertCreated | AdvertDeleted;

export default Action;
