import { useParams } from "react-router-dom";
import { useAdverts } from "../pages/context";
import Button from "../components/shared/Button";

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

  return (
    <>
      <h2 className="text-center mb-4">Advert Detail</h2>
      <div className="container p-4">
        <div className="row ">
          <div className="col-12 col-md-4 ">
            <img
              src={advert.photo}
              alt={advert.name}
              className="img-fluid rounded mx-auto d-block"
            />
          </div>
          <div className="col-12 col-md-8 border rounded d-flex flex-column justify-content-between align-items-center">
            <h3 className="text-center">{advert.name}</h3>
            <p className="d-flex align-items-center gap-2">
              <strong>Price:</strong>
              <span>€ {advert.price}</span>
            </p>
            <p className="d-flex align-items-center gap-2">
              <strong className="">Category:</strong>
              <span className="btn btn-link">{advert.tags}</span>
            </p>
            <div>
              <Button className="btn-danger">Delete</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvertPage;
