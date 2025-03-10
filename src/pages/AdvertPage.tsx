import { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import Button from "../components/shared/Button";
import Modal from "../components/shared/Modal";
import Spinner from "../components/shared/Spinner";
import { getAdvert, getUi } from "../store/selectors/selectors";
import { useAppDispatch, useAppSelector } from "../store/store";
import { AdvertLoaded, AdvertDeleted } from "../store/actions/creators";

const AdvertPage = () => {
  // Get the advert id from the URL
  const { advertId = "" } = useParams();

  // Get the advert from store using selector
  const advert = useAppSelector(getAdvert(advertId));

  // Get the loading state from store using selector
  const { error, loading } = useAppSelector(getUi);

  // Hook to dispatch actions
  const dispatch = useAppDispatch();

  // Hook to redirect to another page
  const navigate = useNavigate();

  // State to control the modal
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!advert) dispatch(AdvertLoaded(advertId));
  }, [dispatch, advert, advertId]);

  const handleConfirmDelete = async () => {
    setShowModal(false);
    await dispatch(AdvertDeleted(advertId, navigate));
  };

  return (
    <>
      {/* Modal */}
      <Modal
        title="Are you sure you want to delete this advert?"
        showModal={showModal}
        onClose={() => setShowModal(false)}
        buttons={[
          {
            textContent: "Cancel",
            className: "btn-primary",
            onClick: () => setShowModal(false),
          },
          {
            textContent: "Confirm",
            className: "btn-danger",
            onClick: handleConfirmDelete,
          },
        ]}
      />

      {!loading && error && <Navigate to="/404" />}

      {loading && (
        <div className="position-fixed top-50 left-50 w-100">
          <Spinner isLoading={loading} />
        </div>
      )}

      {!loading && advert && (
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
                  <Button
                    className="btn-danger"
                    onClick={() => setShowModal(true)}
                  >
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
