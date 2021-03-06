import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../redux/actions/authActions";

const ProfileModal = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [show, setShow] = useState(false);

  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState(user.password);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(authActions.editUser(user._id, { name, password }));
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
              value={name}
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
