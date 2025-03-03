import { NavigateFunction } from "react-router-dom";
import { Credentials, login } from "../../components/auth/service";
import {
  getTags,
  getAdvertById,
  getAllAdverts,
  deleteAdvertById,
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
  return async function (dispatch) {
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
      dispatch(TagsLoadedFulfilled(data));
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

export const TagsLoadedFulfilled = (data: string[]) => ({
  type: "TAGS_LOADED_FULFILLED",
  payload: data,
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

export const AdvertCreated = (advert: Advert): Action => ({
  type: "ADVERT_CREATED",
  payload: advert,
});

export const AdvertDeleted = (
  id: string,
  navigate: NavigateFunction
): AppThunk<Promise<void>> =>
  async function (dispatch) {
    dispatch(AdvertDeletedPending());
    try {
      const advertDeleted = await deleteAdvertById(id);
      dispatch(AdvertDeletedFulfilled(advertDeleted));
      navigate("/");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Ooops! Something went wrong";
      dispatch(AdvertDeletedRejected(errorMessage));
      navigate("/404");
    }
  };

export const AdvertDeletedPending = () => ({
  type: "ADVERT_DELETED_PENDING",
});

export const AdvertDeletedFulfilled = (advert: Advert) => ({
  type: "ADVERT_DELETED_FULFILLED",
  payload: advert,
});

export const AdvertDeletedRejected = (error: string) => ({
  type: "ADVERT_DELETED_REJECTED",
  payload: error,
});
