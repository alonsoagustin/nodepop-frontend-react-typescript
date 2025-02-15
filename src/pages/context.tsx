import { createContext, useContext } from "react";
import type { Advert, ErrorAdvert } from "./types";

interface AdvertsContextValue {
  adverts: Advert[];
  handleDeleteAdvert: (
    advertId: string
  ) => Promise<Advert | ErrorAdvert | undefined>;
  handleCreateAdvert: (
    advert: FormData
  ) => Promise<Advert | ErrorAdvert | undefined>;
  isLoading: boolean;
}

export const AdvertsContext = createContext<AdvertsContextValue>({
  adverts: [],
  handleDeleteAdvert: () => {
    throw new Error("handleDeleteAdvert not implemented");
  },
  handleCreateAdvert: () => {
    throw new Error("handleCreateAdvert not implemented");
  },
  isLoading: false,
});

export const useAdverts = () => {
  const advertsValue = useContext(AdvertsContext);
  return advertsValue;
};
