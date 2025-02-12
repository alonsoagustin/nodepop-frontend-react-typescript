import { useParams } from "react-router-dom";
const AdvertPage = () => {
  // Get the advert id from the URL
  const { advertId } = useParams<{ advertId: string }>();

  console.log(advertId);
  return "AdvertPage";
};

export default AdvertPage;
