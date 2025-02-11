import { useEffect, useState } from "react";
import { getAllAdverts } from "./service";
import { AdvertsContext } from "./context";
import { useAuth } from "../components/auth/context";
import type { Advert } from "./types";

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

  // Hook to manage the adverts state
  const [adverts, setAdverts] = useState<Advert[]>([]);

  // Hook to get all the adverts when the user is logged
  useEffect(() => {
    if (!isLogged) return;

    // Get all the adverts if the user is logged
    const loadAdverts = async () => {
      try {
        const response = await getAllAdverts();
        setAdverts(response);
      } catch (error) {
        console.error("Error while trying to get the adverts", error);
      }
    };
    loadAdverts();
  }, [isLogged]);

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
