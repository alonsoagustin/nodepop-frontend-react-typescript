import { useState } from "react";
import AdvertItem from "./Advert";

const AdvertsPage = () => {
  // The adverts will be updated when the context is updated
  // This way, we avoid making a request to the server every time we access the page
  const { adverts } = useAdverts();

  // Hook to manage the filtered adverts
  const [filteredAdverts, setFilteredAdverts] = useState(adverts);

  // Hook to manage the search input
  const [search, setSearch] = useState("");

  // Hook to manage the checkbox input
  const [checkboxes, setChecked] = useState<Record<string, boolean>>({
    lifestyle: true,
    mobile: true,
    motor: true,
    work: true,
  });

  return (
    <>
      <h2 className="mt-5 text-center">{"List of adverts"}</h2>
      <div className="d-flex justify-content-center align-items-center gap-3 mt-4 mb-4">
        <form>
          <div className="formField d-flex justify-content-center align-items-center">
            <input
              className="formField-input form-control fs-6 "
              type="search"
              placeholder="Search advert by name"
              value={search}
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
                  onChange={handleChekboxChange}
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
                  onChange={handleChekboxChange}
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
                  onChange={handleChekboxChange}
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
                  onChange={handleChekboxChange}
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
          {filteredAdverts.map((advert: Advert) => (
            <div
              key={advert.id}
              className="col-12 col-md-6 col-lg-4"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <AdvertItem advert={advert} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdvertsPage;
