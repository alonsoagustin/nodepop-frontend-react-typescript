import { Link } from "react-router-dom";
import AuthButton from "../auth/AuthButton";

const Header = () => {
  return (
    <header className="navbar bg-black ">
      <div className="container">
        <Link
          to={"/"}
          className="navbar-brand"
          style={{ textDecoration: "none", margin: "0", padding: "0" }}
        >
          <h1 className="mb-0 text-white" style={{ fontSize: "1.5rem" }}>
            Nodepop
          </h1>
        </Link>

        <nav className="navbar gap-3">
          <AuthButton />
        </nav>
      </div>
    </header>
  );
};

export default Header;
