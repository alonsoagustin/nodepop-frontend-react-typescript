import { createContext, use } from "react";
import type { Advert } from "./types";

interface AdvertsContextValue {
  adverts: Advert[];
  handleDeleteAdvert: () => void;
  handleCreateAdvert: () => void;
}

export const AdvertsContext = createContext<AdvertsContextValue>({
  adverts: [] as Advert[],
  handleDeleteAdvert: () => {},
  handleCreateAdvert: () => {},
});

export const useAdverts = () => {
  const advertsValue = use(AdvertsContext);
  return advertsValue;
};
