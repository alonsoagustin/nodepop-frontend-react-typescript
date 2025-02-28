import Button from "../shared/Button";
import Modal from "../shared/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLogged } from "../../store/selectors/selectors";
import { AuthLogout } from "../../store/actions/creators";
import { useAppDispatch } from "../../store/store";

const AuthButton = () => {
  // Hook to dispatch actions
  const dispatch = useAppDispatch();

  // Hook to get the authentication state
  const isLogged = useSelector(getIsLogged);

  const [showModal, setShowModal] = useState(false);

  // Hook to manage the authentication state
  // const { isLogged, onLogout } = useAuth();

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
    dispatch(AuthLogout());
    setShowModal(false);
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
