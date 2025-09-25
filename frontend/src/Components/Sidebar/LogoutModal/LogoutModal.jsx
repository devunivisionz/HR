import React from "react";
import { Button, CloseButton, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ show, close }) => {
  const navigate = useNavigate();

  return (
    <Modal show={show} className="main-modal" onHide={close} size="md" centered>
      <Modal.Header className="modal-heading">
        <Modal.Title className="centered-title">Log Out</Modal.Title>
        <CloseButton onClick={close} style={{ filter: "invert(1)" }} />
      </Modal.Header>

      <Modal.Body
        style={{
          textAlign: "center",
          color: "#121212",
          fontSize: "16px",
          padding: "20px 40px",
        }}
      >
        Are you sure you want to log out?
      </Modal.Body>

      <Modal.Footer
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          paddingBottom: "24px",
        }}
      >
        <Button
          onClick={close}
          style={{
            backgroundColor: "#4D007D",
            color: "white",
            borderRadius: "30px",
            padding: "8px 24px",
            border: "none",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          style={{
            backgroundColor: "white",
            border: "1px solid red",
            borderRadius: "30px",
            color: "red",
            padding: "8px 24px",
          }}
        >
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutModal;
