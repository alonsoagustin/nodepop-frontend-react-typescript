import { useParams } from "react-router-dom";
import { useAdverts } from "../pages/context";
const AdvertPage = () => {
  // Get the advert id from the URL
  const { advertId } = useParams<{ advertId: string }>();

  // Get the advert data from the context
  const { adverts } = useAdverts();

  console.log(advertId);
  console.log(adverts);
  return "AdvertPage";
};

export default AdvertPage;
