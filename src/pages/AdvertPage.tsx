import { useParams } from "react-router-dom";
import { useAdverts } from "../pages/context";
const AdvertPage = () => {
  // Get the advert id from the URL
  const { advertId } = useParams<{ advertId: string }>();

  // Get the advert data from the context
  const { adverts } = useAdverts();

  //Find the advert with the advertId
  const advert = adverts.find((advert) => advert.id === advertId);

  if (advert === undefined)
    return (
      <>
        <h2>Advert not found</h2>
        <p>The advert with id {advertId} was not found</p>
      </>
    );

  console.log(advertId);
  console.log(adverts);
  console.log(advert);

  return "AdvertPage";
};

export default AdvertPage;
