import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdvertsContext } from "./context";
import { useAuth } from "../components/auth/context";
import { createAdvert, deleteAdvertById, getAllAdverts } from "./service";
import type { Advert, ErrorAdvert } from "./types";

// instead of passing the children prop as a parameter, we can destructure it directly in the function signature
// interface Props {
//   children: React.ReactNode;
// }
//export const AdvertsProvider = ({children}: Props) => {....} Usinig interface Props
//export const AdvertsProvider = ({children,}: {children: React.ReactNode;}) => {....} Using destructuring
//export const AdvertsProvider:React.FC<{children: React.ReactNode;}> = ({children}) => {....} Using React.FC

export const AdvertsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Hook to get the user authentication status
  const { isLogged } = useAuth();

  const navigate = useNavigate();

  // Hook to manage the adverts state
  const [adverts, setAdverts] = useState<Advert[]>([]);

  // Hook to manage the reload state
  const [reload, setReload] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  // Hook to get all the adverts when the user is logged
  useEffect(() => {
    if (!isLogged) return;

    // Get all the adverts if the user is logged
    const loadAdverts = async () => {
      try {
        const response = await getAllAdverts();
        if ("statusCode" in response) return response;
        setAdverts(response);
        return response;
      } catch (error) {
        console.error("Error while trying to get the adverts", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAdverts();
  }, [isLogged, reload]);

  const handleDeleteAdvert = async (
    advertId: string
  ): Promise<Advert | ErrorAdvert | undefined> => {
    try {
      const response = await deleteAdvertById(advertId);
      if ("statusCode" in response) return response;
      setReload((reload) => !reload);
      navigate("/");
      return response;
    } catch (error) {
      console.error("Error while trying to delete the advert", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to create an advert
  const handleCreateAdvert = async (
    advert: FormData
  ): Promise<Advert | ErrorAdvert | undefined> => {
    try {
      const response = await createAdvert(advert);
      if ("statusCode" in response) throw response;
      setReload((reload) => !reload);
      return response;
    } catch (error) {
      console.error("Error while trying to create the advert", error);
    } finally {
      setIsLoading(false);
    }
  };

  const advertsValue = {
    adverts,
    handleDeleteAdvert,
    handleCreateAdvert,
    isLoading,
  };

  return (
    <AdvertsContext.Provider value={advertsValue}>
      {children}
    </AdvertsContext.Provider>
  );
};
