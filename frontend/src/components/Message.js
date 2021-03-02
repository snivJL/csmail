import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import Moment from "react-moment";

import messagesActions from "../redux/actions/messagesActions";
const Message = ({ message }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col border-success p-2 rounded-lg">
      <div id="message-nav" className="font-weight-bold">
        <Link to={`/message/${message._id}`}>
          <div>{message.title}</div>
        </Link>
        <Button
          variant="outline-warning"
          onClick={() => dispatch(messagesActions.deleteMessage(message._id))}
          type="button"
        >
          <i
            className={
              message.isDeleted ? "fas fa-trash-restore" : "fas fa-trash-alt"
            }
          ></i>
        </Button>
      </div>
      <div>
        {message.content.length > 18
          ? message.content.slice(0, 18) + "..."
          : message.content}
      </div>
      <Row className="mt-2 font-weight-light">
        <Col md={6}>{message.from.name}</Col>
        <Col className="px-0" md={6}>
          <Moment fromNow>{message.createdAt}</Moment>
        </Col>
      </Row>
    </div>
  );
};

export default Message;
