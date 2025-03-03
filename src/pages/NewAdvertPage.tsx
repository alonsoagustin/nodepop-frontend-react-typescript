import { useState } from "react";
import Button from "../components/shared/Button";
import Modal from "../components/shared/Modal";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { AdvertCreated, ResetUi } from "../store/actions/creators";
import { getUi } from "../store/selectors/selectors";
import Spinner from "../components/shared/Spinner";

const NewAdvertPage = () => {
  const navigate = useNavigate();

  const [nameAdvert, setNameAdvert] = useState<string>("");
  const [typeAdvert, setTypeAdvert] = useState<boolean>(true);
  const [priceAdvert, setPriceAdvert] = useState<number>(0);
  const [tagsAdvert, setTagsAdvert] = useState<string>("");
  const [photoAdvert, setPhotoAdvert] = useState<File>();

  const isDisabled = !nameAdvert || !priceAdvert || !tagsAdvert.length;

  const { error, loading } = useAppSelector(getUi);
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // We need to work with FormData to send the file to the server
    // We can't send files (bynary data) with JSON
    const advert = new FormData();
    advert.append("name", nameAdvert);
    advert.append("sale", typeAdvert.toString());
    advert.append("price", priceAdvert.toString());
    advert.append("tags", tagsAdvert); // The API documentation says it expects an array, but it actually requires a string.

    // If we have a photo, we append it to the formData
    if (photoAdvert) advert.append("photo", photoAdvert);

    dispatch(AdvertCreated(advert, navigate));
  };

  const handleNameAdvertChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNameAdvert(event.target.value);
  };

  const handleTypeAdvertChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const typeAdvert = event.target.id;
    setTypeAdvert(typeAdvert === "sale" ? true : false);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceAdvert(parseInt(event.target.value));
  };

  const handleTagsAdvertChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTagsAdvert(event.target.value);
  };

  const handlePhotoAdvertChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    setPhotoAdvert(event.target.files[0]);
  };

  const handleCloseModal = () => {
    dispatch(ResetUi());
  };

  return (
    <>
      {loading && (
        <div className="position-fixed top-50 left-50 w-100">
          <Spinner isLoading={loading} />
        </div>
      )}

      {!loading && error && (
        <Modal
          title={error}
          showModal={!!error}
          onClose={handleCloseModal}
          buttons={[
            {
              textContent: "OK",
              className: "btn-primary",
              onClick: handleCloseModal,
            },
          ]}
        />
      )}

      {!loading && !error && (
        <>
          <h2 className="text-center mb-4">CREATE A NEW ADVERT</h2>
          <div className="container">
            <div className="row d-flex justify-content-center">
              <form
                className="col-12 col-md-6 col-lg-4 p-4 border rounded"
                onSubmit={handleSubmit}
              >
                <div className="mb-3">
                  <label className="form-label" htmlFor="name">
                    <span>Name:</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Insert the name of the advert here"
                    autoComplete="on"
                    value={nameAdvert}
                    onChange={handleNameAdvertChange}
                    required
                  />
                </div>
                <div className="d-flex gap-3 mb-3">
                  <div className="form-check">
                    <label htmlFor="type">
                      <span>Sale</span>
                    </label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="type"
                      id="sale"
                      onChange={handleTypeAdvertChange}
                      defaultChecked
                    />
                  </div>
                  <div className="form-check">
                    <label htmlFor="sale">
                      <span className="">Buy</span>
                    </label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="type"
                      id="buy"
                      onChange={handleTypeAdvertChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="price">
                    <span>Price:</span>
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    name="price"
                    id="price"
                    value={priceAdvert}
                    onChange={handlePriceChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="tags">
                    <span>Category:</span>
                  </label>
                  <select
                    className="form-select"
                    name="tags"
                    id="tags"
                    onChange={handleTagsAdvertChange}
                  >
                    <option value="work">Select a category</option>
                    <option value="work">Work</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="motor">Motor</option>
                    <option value="mobile">Mobile</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="photo">
                    <span>Upload a photo:</span>
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    name="photo"
                    id="photo"
                    accept="image/*"
                    required
                    onChange={handlePhotoAdvertChange}
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <Button className="btn-primary" disabled={isDisabled}>
                    Create
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NewAdvertPage;
