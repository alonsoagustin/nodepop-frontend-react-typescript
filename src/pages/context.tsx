import { createContext, useContext } from "react";
import type { Advert } from "./types";

interface AdvertsContextValue {
  adverts: Advert[];
  handleDeleteAdvert: () => void;
  handleCreateAdvert: (advert: FormData) => void;
}

export const AdvertsContext = createContext<AdvertsContextValue>({
  adverts: [],
  handleDeleteAdvert: () => {},
  handleCreateAdvert: () => {},
});

export const useAdverts = () => {
  const advertsValue = useContext(AdvertsContext);
  return advertsValue;
};
