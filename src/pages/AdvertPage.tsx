import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAdverts } from "../pages/context";
import Button from "../components/shared/Button";

const AdvertPage = () => {
  // Get the advert id from the URL
  const { advertId } = useParams<{ advertId: string }>();

  // Get the advert data from the context
  const { adverts } = useAdverts();

  // State to control the modal
  const [showModal, setShowModal] = useState(false);

  //Find the advert with the advertId
  const advert = adverts.find((advert) => advert.id === advertId);

  if (advert === undefined)
    return (
      <>
        <h2>Advert not found</h2>
        <p>The advert with id {advertId} was not found</p>
      </>
    );

  // Function to open the modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* Modal */}
      {showModal && (
        <div>
          <div
            onClick={handleCloseModal}
            className="position-fixed top-0 start-0 w-100 vh-100 bg-dark bg-opacity-50"
          />
          <dialog
            open
            className="border rounded p-4 position-absolute top-50 start-50 translate-middle"
          >
            <h2 className="fs-5">
              Are you sure you want to delete this advert?
            </h2>
            <div className="d-flex justify-content-between w-50 mx-auto mt-4">
              <Button className="btn-primary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button className="btn-danger">Delete</Button>
            </div>
          </dialog>
        </div>
      )}

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
              <Button className="btn-danger" onClick={handleOpenModal}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvertPage;
