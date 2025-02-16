import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAdverts } from "../pages/context";
import Button from "../components/shared/Button";
import Modal from "../components/shared/Modal";
import Spinner from "../components/shared/Spinner";
import type { Advert } from "./types";

const AdvertPage = () => {
  // Get the advert id from the URL
  const { advertId = "" } = useParams();

  // Get the advert data from the context
  const { adverts, isLoading, handleDeleteAdvert } = useAdverts();

  const navigate = useNavigate();

  // State to control the modal
  const [showModal, setShowModal] = useState(false);
  const [showNotFoundModal, setShowNotFoundModal] = useState(false);
  const [advert, setAdvert] = useState<Advert | undefined>();

  useEffect(() => {
    const foundAdvert = adverts.find((advert) => advert.id === advertId);
    setAdvert(foundAdvert);

    if (!foundAdvert) {
      setShowNotFoundModal(true);
    }
  }, [adverts, advertId]);

  if (isLoading) {
    return (
      <div className="position-fixed top-50 left-50 w-100">
        <Spinner isLoading={isLoading} />;
      </div>
    );
  }

  // Function to open the modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseNotFoundModal = () => {
    setShowNotFoundModal(false);
    navigate("/");
  };

  const handleCreateAdvert = () => {
    navigate("/adverts/new");
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
        onClose={handleCloseModal}
        buttons={[
          {
            textContent: "Cancel",
            className: "btn-primary",
            onClick: handleCloseModal,
          },
          {
            textContent: "Delete",
            className: "btn-danger",
            onClick: handleConfirmDelete,
          },
        ]}
      />

      {!advert ? (
        <>
          <Modal
            title="Advert not found"
            showModal={showNotFoundModal}
            onClose={handleCloseNotFoundModal}
            buttons={[
              {
                textContent: "Cancel",
                className: "btn-primary",
                onClick: handleCloseNotFoundModal,
              },
              {
                textContent: "Create",
                className: "btn-success",
                onClick: handleCreateAdvert,
              },
            ]}
          />
        </>
      ) : (
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
                  <Button className="btn-danger" onClick={handleOpenModal}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdvertPage;
