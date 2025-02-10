import type { Advert } from "./types";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "../components/shared/Button";

interface Props {
  advert: Advert;
}

const Advert = ({ advert }: Props) => {
  const navigate = useNavigate();

  const handleClickButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const currentTarget = event.currentTarget.textContent?.trim() as string;

    if (currentTarget === "Detail") {
      console.log("Detail");
      navigate(`/adverts/${advert.id}`);
    }
  };

  return (
    <article id={advert.id} className="card " style={{ width: "20rem" }}>
      <div className="card-header bg-black">
        <h3 className="card-title fs-3 text-center text-white">
          {advert.name}
        </h3>
      </div>
      <div className="card-body">
        <div className="card-tags text-center">
          <Link to={`/adverts?tags=${advert.tags}`}>
            <span
              className="card-link btn btn-link"
              style={{ textDecoration: "none" }}
            >{`# ${advert.tags}`}</span>
          </Link>
        </div>
        <div className="card-state text-center">
          <span className="card-text text-success fs-5 fw-bold">
            {advert.sale ? "Available" : "Not available"}
          </span>
        </div>
        <div className="card-price text-center">
          <span className="card-text fs-3 fw-bold">{`€ ${advert.price}`}</span>
        </div>
      </div>
      <div className="card-footer">
        <div
          className="card-actions"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <Button onClick={handleClickButton} className={"btn-outline-dark"}>
            Detail
          </Button>
        </div>
      </div>
    </article>
  );
};

export default Advert;
