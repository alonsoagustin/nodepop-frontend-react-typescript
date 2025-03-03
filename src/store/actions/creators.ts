import { NavigateFunction } from "react-router-dom";
import { Credentials, login } from "../../components/auth/service";
import {
  getTags,
  getAdvertById,
  getAllAdverts,
  deleteAdvertById,
  createAdvert,
} from "../../pages/service";
import { Advert } from "../../pages/types";
import { AppThunk } from "../store";
import Action from "./type";

export const AuthLoginPending = () => ({
  type: "AUTH_LOGIN_PENDING",
});

export const AuthLoginFulfilled = () => ({
  type: "AUTH_LOGIN_FULFILLED",
});

export const AuthLoginRejected = (error: string) => ({
  type: "AUTH_LOGIN_REJECTED",
  payload: error,
});

export const AuthLogin = (
  credentials: Credentials
): AppThunk<Promise<void>> => {
  return async function (dispatch) {
    try {
      dispatch(AuthLoginPending());
      const response = await login(credentials);
      localStorage.setItem("accessToken", response);
      dispatch(AuthLoginFulfilled());
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Ooops! Something went wrong";
      dispatch(AuthLoginRejected(errorMessage));
    }
  };
};

export const AuthLogout = (): AppThunk => (dispatch) => {
  localStorage.removeItem("accessToken");
  dispatch({ type: "AUTH_LOGOUT" });
};

export const ResetUi = (): Action => ({
  type: "RESET_UI",
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

export const AdvertLoaded = (advertId: string): AppThunk<Promise<void>> => {
  return async function (dispatch, getState) {
    const state = getState();
    if (state.adverts.loaded) return;

    dispatch(AdvertsLoadedPending());

    try {
      const data = await getAdvertById(advertId);
      dispatch(AdvertsLoadedFulfilled([data], false));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Ooops! Something went wrong";
      dispatch(AdvertsLoadedRejected(errorMessage));
    }
  };
};

export const TagsLoaded = (): AppThunk<Promise<void>> => {
  return async function (dispatch, getState) {
    const state = getState();
    if (state.tags.loaded) return;

    dispatch(TagsLoadedPending());

    try {
      const data = await getTags();
      dispatch(TagsLoadedFulfilled(data, true));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Ooops! Something went wrong";
      dispatch(TagsLoadedRejected(errorMessage));
    }
  };
};

export const TagsLoadedPending = () => ({
  type: "TAGS_LOADED_PENDING",
});

export const TagsLoadedFulfilled = (data: string[], loaded: boolean) => ({
  type: "TAGS_LOADED_FULFILLED",
  payload: { data, loaded },
});

export const TagsLoadedRejected = (error: string) => ({
  type: "TAGS_LOADED_REJECTED",
  payload: error,
});

export const FilterAdvertsByTag = (tag: string) => ({
  type: "FILTER_ADVERTS_BY_TAG",
  payload: tag,
});

export const FilterAdvertsByName = (name: string) => ({
  type: "FILTER_ADVERTS_BY_NAME",
  payload: name,
});

export const AdvertCreated = (
  advert: FormData,
  navigate: NavigateFunction
): AppThunk<Promise<void>> =>
  async function (dispatch) {
    dispatch(AdvertCreatedPending());
    try {
      const advertCreated = await createAdvert(advert);
      dispatch(AdvertCreatedFulfilled(advertCreated));
      navigate(`/adverts/${advertCreated.id}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Ooops! Something went wrong";
      dispatch(AdvertCreatedRejected(errorMessage));
    }
  };

export const AdvertCreatedPending = () => ({
  type: "ADVERT_CREATED_PENDING",
});

export const AdvertCreatedFulfilled = (advert: Advert) => ({
  type: "ADVERT_CREATED_FULFILLED",
  payload: advert,
});

export const AdvertCreatedRejected = (error: string) => ({
  type: "ADVERT_CREATED_REJECTED",
  payload: error,
});

export const AdvertDeleted = (
  id: string,
  navigate: NavigateFunction
): AppThunk<Promise<void>> =>
  async function (dispatch) {
    dispatch(AdvertDeletedPending());
    try {
      await deleteAdvertById(id);
      dispatch(AdvertDeletedFulfilled(id));
      navigate("/");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Ooops! Something went wrong";
      dispatch(AdvertDeletedRejected(errorMessage));
    }
  };

export const AdvertDeletedPending = () => ({
  type: "ADVERT_DELETED_PENDING",
});

export const AdvertDeletedFulfilled = (advertId: string) => ({
  type: "ADVERT_DELETED_FULFILLED",
  payload: { id: advertId },
});

export const AdvertDeletedRejected = (error: string) => ({
  type: "ADVERT_DELETED_REJECTED",
  payload: error,
});
