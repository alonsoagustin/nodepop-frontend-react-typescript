import Button from "../shared/Button";
import Modal from "../shared/Modal";
import { useAuth } from "./context";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthButton = () => {
  const [showModal, setShowModal] = useState(false);

  // Hook to manage the authentication state
  const { isLogged, onLogout } = useAuth();

  // Hook to navigate between routes
  const navigate = useNavigate();

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Get the text content of the button clicked
    const currentTarget = event.currentTarget.textContent?.trim() as string;

    // Define the routes to navigate to
    const routes: Record<string, string> = {
      Login: "/login",
      Signup: "/signup",
      New: "/adverts/new",
    };

    // Navigate to the route associated with the button clicked
    navigate(routes[currentTarget]);
  };

  const displayModal = () => {
    setShowModal(true);
  };

  const handleCancelLogout = () => {
    setShowModal(false);
  };

  const handleConfirmLogout = () => {
    onLogout();
    setShowModal(false);
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  const renderAuthButtons = () => {
    return (
      <>
        <Button className={"btn-outline-light"} onClick={handleOnClick}>
          Login
        </Button>
        <Button className={"btn-outline-light"} onClick={handleOnClick}>
          Signup
        </Button>
      </>
    );
  };

  const renderUserButtons = () => {
    return (
      <>
        <Button className={"btn-outline-light"} onClick={handleOnClick}>
          New
        </Button>
        <Button className={"btn-outline-light"} onClick={displayModal}>
          Logout
        </Button>
      </>
    );
  };

  const modal = () => {
    return (
      <Modal
        title="Do you really want to log out?"
        showModal={showModal}
        onClose={handleCancelLogout}
        buttons={[
          {
            textContent: "Cancel",
            className: "btn-primary",
            onClick: handleCancelLogout,
          },
          {
            textContent: "Logout",
            className: "btn-danger",
            onClick: handleConfirmLogout,
          },
        ]}
      />
    );
  };

  return (
    <>
      {isLogged ? (
        <>
          {modal()}
          {renderUserButtons()}
        </>
      ) : (
        <>{renderAuthButtons()}</>
      )}
    </>
  );
};

export default AuthButton;
