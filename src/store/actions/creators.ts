import { Advert } from "../../pages/types";
import Action from "./type";

const Login = (): Action => ({
  type: "LOGIN",
});

const Logout = (): Action => ({
  type: "LOGOUT",
});

const AdvertsLoaded = (adverts: Advert[]): Action => ({
  type: "ADVERTS_LOADED",
  payload: adverts,
});

const AdvertCreated = (advert: Advert): Action => ({
  type: "ADVERT_CREATED",
  payload: advert,
});

const AdvertDeleted = (id: number): Action => ({
  type: "ADVERT_DELETED",
  payload: id,
});
