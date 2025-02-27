import { useState } from "react";
import AdvertItem from "./Advert";
import FormField from "../components/shared/FormField";
import Spinner from "../components/shared/Spinner";
import Modal from "../components/shared/Modal";
import { useAdverts } from "./context";
import type { Advert } from "./types";

const AdvertsPage = () => {
  // Hook to get the adverts from the context
  const { adverts, isLoading } = useAdverts();
  console.log("isLoading:", isLoading);

  //
  const [showModal, setShowModal] = useState(true);

  // Hook to manage the search term
  const [search, setSearch] = useState("");

  // Hook to manage the selected categories
  const [checkboxes, setChecked] = useState<Record<string, boolean>>({
    lifestyle: true,
    mobile: true,
    motor: true,
    work: true,
  });

  // Function to handle the search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This function will be executed when the input value changes
    // It will update the search state with the new value
    // The search state will be used to filter the adverts
    setSearch(e.target.value);
  };

  // Function to handle the checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Copy the previous state modifying the checkbox that has changed
    setChecked({ ...checkboxes, [e.target.name]: e.target.checked });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // A useEffect is not needed here because the adverts data is already being
  // fetched and managed by the context (useAdverts). The component re-renders
  // automatically when the context updates, ensuring that the latest data
  // is displayed without requiring an additional effect to fetch adverts again.
  const filteredAdverts = adverts.filter((advert: Advert) => {
    // Check if the advert name includes the search term
    const matchesSearch = advert.name
      .toLowerCase()
      .includes(search.toLowerCase());

    // Get the keys of the checkboxes object
    const checkboxesKeys = Object.keys(checkboxes);

    // Check if the advert tags include the selected categories
    const matchesCategory = checkboxesKeys.some(
      (key) => checkboxes[key] && advert.tags.includes(key)
    );
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <h2 className="text-center mb-5">{"List of adverts"}</h2>
      {/* Filters*/}
      <div className="container mb-5">
        <div className="row justify-content-center">
          {/* input text */}
          <form
            className="col-12 col-md-4 col-lg-3 p-1"
            style={{ height: "2.75rem" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <FormField
              type="search"
              name="search"
              id="search"
              value={search}
              placeholder="Search advert by name"
              onChange={handleSearchChange}
              className={{
                container:
                  "formField d-flex justify-content-center align-items-center p-0 m-0",
                input: "formField-input form-control fs-6 h-100",
              }}
            />
          </form>

          {/* input checkbox */}
          <form
            className="col-12 col-md-8 col-lg-5 p-1"
            style={{ height: "2.75rem" }}
          >
            <fieldset className="border rounded p-1">
              <div className="row g-2">
                <FormField
                  inputBeforeLable
                  type="checkbox"
                  id="lifestyle"
                  checked={checkboxes.lifestyle}
                  onChange={handleCheckboxChange}
                  label="Lifestyle"
                  className={{
                    container:
                      "form-check col-6 col-md-3 d-flex justify-content-center align-items-center",
                    labelClass: "form-check-label",
                    input: "form-check-input me-2",
                  }}
                />

                <FormField
                  inputBeforeLable
                  type="checkbox"
                  id="mobile"
                  checked={checkboxes.mobile}
                  onChange={handleCheckboxChange}
                  label="Mobile"
                  className={{
                    container:
                      "form-check col-6 col-md-3 d-flex justify-content-center align-items-center",
                    labelClass: "form-check-label",
                    input: "form-check-input me-2",
                  }}
                />

                <FormField
                  inputBeforeLable
                  type="checkbox"
                  id="motor"
                  checked={checkboxes.motor}
                  onChange={handleCheckboxChange}
                  label="Motor"
                  className={{
                    container:
                      "form-check col-6 col-md-3 d-flex justify-content-center align-items-center",
                    labelClass: "form-check-label",
                    input: "form-check-input me-2",
                  }}
                />

                <FormField
                  inputBeforeLable
                  type="checkbox"
                  id="work"
                  checked={checkboxes.work}
                  onChange={handleCheckboxChange}
                  label="Work"
                  className={{
                    container:
                      "form-check col-6 col-md-3 d-flex justify-content-center align-items-center",
                    labelClass: "form-check-label",
                    input: "form-check-input me-2",
                  }}
                />
              </div>
            </fieldset>
          </form>
        </div>
      </div>

      {/* List of adverts */}
      <div className="container">
        {isLoading ? (
          <Spinner isLoading={isLoading} />
        ) : (
          <div className="row gap-4 justify-content-center">
            {filteredAdverts.length > 0 ? (
              filteredAdverts.map((advert: Advert) => (
                <div
                  key={advert.id}
                  className="col-12 col-md-5 col-lg-3 p-0 d-flex justify-content-center"
                >
                  <AdvertItem advert={advert} />
                </div>
              ))
            ) : (
              <Modal
                title="No adverts found"
                showModal={showModal}
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
          </div>
        )}
      </div>
    </>
  );
};

export default AdvertsPage;
