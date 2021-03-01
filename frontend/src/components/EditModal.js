import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import messagesActions from "../redux/actions/messagesActions";

const EditModal = ({ message }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(messagesActions.editMessage(message._id, { title, content }));
    setShow(false);
  };

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        <i className="fas fa-edit"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              placeholder={message.title}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Content</Form.Label>
            <Form.Control
              onChange={(e) => setContent(e.target.value)}
              name="content"
              as="textarea"
              placeholder={message.content}
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

export default EditModal;
