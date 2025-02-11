import { useState, useEffect } from "react";
import AdvertItem from "./Advert";
import { useAdverts } from "./context";
import type { Advert } from "./types";

const AdvertsPage = () => {
  // Hook to get the adverts from the context
  const { adverts } = useAdverts();

  // Hook to manage the filtered adverts
  const [filteredAdverts, setFilteredAdverts] = useState<Advert[]>(adverts);

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
    // Get the name and checked properties from the checkbox
    const { name, checked } = e.target;
    setChecked((prevState) => {
      // Copy the previous state modifying the checkbox that has changed
      return {
        ...prevState,
        [name]: checked,
      };
    });
  };

  // Hook to filter the adverts based on the search term and the selected categories
  // This hook will be executed when the search term, the checkboxes or the adverts change
  useEffect(() => {
    // Start by setting the filtered adverts to all the adverts
    setFilteredAdverts(adverts);

    // Get the keys of the checkboxes object
    const checkboxesKeys = Object.keys(checkboxes);

    // Filter the adverts based on the search term and the selected categories
    const filtered = adverts.filter((advert: Advert) => {
      // Check if the advert name includes the search term
      const matchesSearch = advert.name
        .toLowerCase()
        .includes(search.toLowerCase());

      // Check if the advert tags include the selected categories
      const matchesCategory = checkboxesKeys.some(
        (key) => checkboxes[key] && advert.tags.includes(key)
      );
      return matchesSearch && matchesCategory;
    });

    // Update the filtered adverts state
    setFilteredAdverts(filtered);
  }, [search, checkboxes, adverts]);

  return (
    <>
      <h2 className="mt-5 text-center">{"List of adverts"}</h2>
      <div className="d-flex justify-content-center align-items-center gap-3 mt-4 mb-4">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="formField d-flex justify-content-center align-items-center">
            <input
              className="formField-input form-control fs-6 "
              type="search"
              placeholder="Search advert by name"
              value={search} // The input value is controlled by the search state
              onChange={handleSearchChange}
            />
          </div>
        </form>
        <form>
          <fieldset
            className=" d-flex align-items-center fs-6 border rounded"
            style={{ color: "#595C5F", padding: "6px" }}
          >
            <legend className="col-form-label m-0 p-0">
              <span>Categories:</span>
            </legend>
            <div className="d-flex gap-2">
              <div className="form-check m-0 ms-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="lifestyle"
                  id="lifestyle"
                  value="lifestyle"
                  checked={checkboxes.lifestyle}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="lifestyle">
                  Lifestyle
                </label>
              </div>
              <div className="form-check m-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="mobile"
                  id="mobile"
                  value="mobile"
                  checked={checkboxes.mobile}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="mobile">
                  Mobile
                </label>
              </div>
              <div className="form-check m-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="motor"
                  id="motor"
                  value="motor"
                  checked={checkboxes.motor}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="motor">
                  Motor
                </label>
              </div>
              <div className="form-check m-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="work"
                  id="work"
                  value="work"
                  checked={checkboxes.work}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="work">
                  Work
                </label>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
      <div className="container">
        <div className="row" style={{ gap: "1rem" }}>
          {Array.isArray(filteredAdverts) ? (
            filteredAdverts.map((advert: Advert) => (
              <div
                key={advert.id}
                className="col-12 col-md-6 col-lg-4"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <AdvertItem advert={advert} />
              </div>
            ))
          ) : (
            // TODO: Provide a better error message or link to navigate to new adverts
            <h2 className="text-center">No adverts found</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default AdvertsPage;
