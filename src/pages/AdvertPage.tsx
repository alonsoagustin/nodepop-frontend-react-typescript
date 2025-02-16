import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAdverts } from "../pages/context";
import Button from "../components/shared/Button";
import Modal from "../components/shared/Modal";

const AdvertPage = () => {
  // Get the advert id from the URL
  const { advertId = "" } = useParams();

  // Get the advert data from the context
  const { adverts, handleDeleteAdvert } = useAdverts();

  const navigate = useNavigate();

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
  const displayModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const deletedAdvert = await handleDeleteAdvert(advertId);
      if ("id" in deletedAdvert!) navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Modal */}
      <Modal
        title="Are you sure you want to delete this advert?"
        showModal={showModal}
        onClose={handleCancelDelete}
        buttons={[
          {
            textContent: "Cancel",
            className: "btn-primary",
            onClick: handleCancelDelete,
          },
          {
            textContent: "Delete",
            className: "btn-danger",
            onClick: handleConfirmDelete,
          },
        ]}
      />

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
              <Button className="btn-danger" onClick={displayModal}>
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
