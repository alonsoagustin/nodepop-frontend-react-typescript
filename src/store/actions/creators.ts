import { getTags, getAdvertById, getAllAdverts } from "../../pages/service";
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

export const FilterAdvertsByTag = (TagName: string) => ({
  type: "FILTER_ADVERTS_BY_TAG",
  payload: TagName,
});

export const AdvertCreated = (advert: Advert): Action => ({
  type: "ADVERT_CREATED",
  payload: advert,
});

export const AdvertDeleted = (id: number): Action => ({
  type: "ADVERT_DELETED",
  payload: id,
});
