import React from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import messagesActions from "../redux/actions/messagesActions";
const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <ListGroup as="ul" variant="flush" style={{ maxWidth: "10rem" }}>
      <ListGroup.Item
        as="li"
        action
        active
        onClick={() => dispatch(messagesActions.getMessages())}
      >
        Inbox
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        action
        onClick={() => dispatch(messagesActions.filterMessages(true))}
      >
        Read
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        action
        onClick={() => dispatch(messagesActions.filterMessages(false))}
      >
        Not read
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        action
        onClick={() => dispatch(messagesActions.getDeletedMessages())}
      >
        Trash
      </ListGroup.Item>
    </ListGroup>
  );
};

export default Sidebar;
