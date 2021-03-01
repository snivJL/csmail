import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import usersActions from "../redux/actions/usersActions";

const ProfileModal = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const userLocalStorage = localStorage.getItem("user");
  const user = JSON.parse(userLocalStorage).user;
  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(usersActions.editUser(user._id, { name, password }));
    setShow(false);
  };
  return (
    <>
      <div variant="light" onClick={handleShow}>
        Profile
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              name="title"
              placeholder="name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              name="content"
              as="textarea"
              placeholder="password"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileModal;
