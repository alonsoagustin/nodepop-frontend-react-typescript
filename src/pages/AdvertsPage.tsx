import { useEffect, useState } from "react";
import AdvertItem from "./Advert";
import FormField from "../components/shared/FormField";
import Spinner from "../components/shared/Spinner";
import Modal from "../components/shared/Modal";
import type { Advert } from "./types";
import {
  getUi,
  getTags,
  getAdverts,
  getFilters,
} from "../store/selectors/selectors";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  TagsLoaded,
  AdvertsLoaded,
  FilterAdvertsByTag,
} from "../store/actions/creators";

const AdvertsPage = () => {
  // Hook to manage the modal state
  const [showModal, setShowModal] = useState(true);

  // Hook to manage the search term
  const [search, setSearch] = useState("");

  // Hook to get the adverts from the store using the selector
  const { data: adverts, loaded: advertsLoaded } = useAppSelector(getAdverts);

  const { data: tags, loaded: tagsLoaded } = useAppSelector(getTags);

  const { tags: filters } = useAppSelector(getFilters);

  // Hook to get the ui state from the store using the selector
  const { error, loading } = useAppSelector(getUi);

  // Hook to dispatch actions to the store
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(AdvertsLoaded());
    dispatch(TagsLoaded());
  }, [dispatch]);

  // Function to handle the search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This function will be executed when the input value changes
    // It will update the search state with the new value
    // The search state will be used to filter the adverts
    setSearch(e.target.value);
  };

  // Function to handle the checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(FilterAdvertsByTag(e.target.name));
  };

  // Function to handle the modal close
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Filter the adverts based on the search term and the selected categories
  const filteredAdverts = adverts.filter((advert: Advert) => {
    if (!filters.length) return advert;

    if (advert.tags.some((tag) => filters.includes(tag))) return advert;
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
          {tagsLoaded && (
            <form
              className="col-12 col-md-8 col-lg-5 p-1"
              style={{ height: "2.75rem" }}
            >
              <fieldset className="border rounded p-1">
                <div className="row g-2">
                  {tags.map((tag) => (
                    <FormField
                      key={tag}
                      inputBeforeLable
                      type="checkbox"
                      id={tag}
                      checked={filters.includes(tag)}
                      onChange={handleCheckboxChange}
                      label={tag}
                      className={{
                        container:
                          "form-check col-6 col-md-3 d-flex justify-content-center align-items-center",
                        labelClass: "form-check-label",
                        input: "form-check-input me-2",
                      }}
                    />
                  ))}
                </div>
              </fieldset>
            </form>
          )}
        </div>
      </div>

      {/* List of adverts */}
      <div className="container">
        {loading && <Spinner isLoading />}

        {/* if there is an error, show a modal with the error message
         */}
        {error && (
          <Modal
            title={error}
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

        {/* if there are adverts show the adverts
         */}
        {adverts.length > 0 && !loading && (
          <div className="row justify-content-center gap-3">
            {filteredAdverts.map((advert: Advert) => (
              <div
                key={advert.id}
                className="col-12 col-md-5 col-lg-3 p-0 d-flex justify-content-center"
              >
                <AdvertItem advert={advert} />
              </div>
            ))}
          </div>
        )}

        {/* if no adverts are found, show a modal with a message*/}
        {adverts.length === 0 && advertsLoaded && (
          <Modal
            title={"No adverts found"}
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
    </>
  );
};

export default AdvertsPage;
