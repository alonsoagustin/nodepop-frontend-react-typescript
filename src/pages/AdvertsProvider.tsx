import { useEffect, useState } from "react";
import { getAllAdverts } from "./service";
import { AdvertsContext } from "./context";

interface AdvertsContextValue {
  children: React.ReactNode;
}

export const AdvertsProvider = ({ children }: AdvertsContextValue) => {
  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    const loadAdverts = async () => {
      try {
        const response = await getAllAdverts();
        setAdverts(response);
      } catch (error) {
        console.error("Error while trying to get the adverts", error);
      }
    };
    loadAdverts();
  }, []);

  const handleDeleteAdvert = async () => {
    console.log("deleteAdvert");
  };

  const handleCreateAdvert = async () => {
    console.log("createAdvert");
  };

  const advertsValue = {
    adverts,
    handleDeleteAdvert,
    handleCreateAdvert,
  };

  return (
    <AdvertsContext.Provider value={advertsValue}>
      {children}
    </AdvertsContext.Provider>
  );
};
