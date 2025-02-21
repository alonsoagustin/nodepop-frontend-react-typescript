import { Advert } from "../../pages/types";
import Action from "./type";

export const Login = (): Action => ({
  type: "LOGIN",
});

export const Logout = (): Action => ({
  type: "LOGOUT",
});

export const AdvertsLoaded = (adverts: Advert[]): Action => ({
  type: "ADVERTS_LOADED",
  payload: adverts,
});

export const AdvertCreated = (advert: Advert): Action => ({
  type: "ADVERT_CREATED",
  payload: advert,
});

export const AdvertDeleted = (id: number): Action => ({
  type: "ADVERT_DELETED",
  payload: id,
});
