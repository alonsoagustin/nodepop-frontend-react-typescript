import { getAllAdverts } from "../../pages/service";
import { Advert } from "../../pages/types";
import { AppThunk } from "../store";
import Action from "./type";

export const Login = (): Action => ({
  type: "LOGIN",
});

export const Logout = (): Action => ({
  type: "LOGOUT",
});

export const AdvertsLoaded = (): AppThunk<Promise<void>> => {
  return async function (dispatch, getState) {
    const state = getState();
    if (state.adverts.loaded) return;

    dispatch(AdvertsLoadedPending());

    try {
      const data = await getAllAdverts();
      dispatch(AdvertsLoadedFulfilled(data, true));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Ooops! Something went wrong";
      dispatch(AdvertsLoadedRejected(errorMessage));
    }
  };
};

export const AdvertsLoadedPending = () => ({
  type: "ADVERTS_LOADED_PENDING",
});

export const AdvertsLoadedFulfilled = (data: Advert[], loaded: boolean) => ({
  type: "ADVERTS_LOADED_FULFILLED",
  payload: { data, loaded },
});

export const AdvertsLoadedRejected = (error: string) => ({
  type: "ADVERTS_LOADED_REJECTED",
  payload: error,
});

export const AdvertCreated = (advert: Advert): Action => ({
  type: "ADVERT_CREATED",
  payload: advert,
});

export const AdvertDeleted = (id: number): Action => ({
  type: "ADVERT_DELETED",
  payload: id,
});
