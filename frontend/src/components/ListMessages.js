import React, { useEffect } from "react";
import { Row, Col, ListGroup, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import messagesActions from "../redux/actions/messagesActions";
import Message from "./Message";
const ListMessages = () => {
  const messages = useSelector((state) => state.messages);
  const { loading, messagesList, createdFlag, filtered, filterFlag } = messages;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(messagesActions.getMessages());
  }, [dispatch, createdFlag]);
  return (
    <>
      {loading ? (
        <Spinner animation="grow" variant="primary" />
      ) : (
        <Row>
          <Col className="pl-0">
            <ListGroup variant="flush">
              {filterFlag
                ? filtered.map((message) => (
                    <ListGroup.Item
                      key={message._id}
                      className={
                        message.status === "unseen" && "font-weight-bold"
                      }
                    >
                      <Message message={message} />
                    </ListGroup.Item>
                  ))
                : messagesList.map((message) => (
                    <ListGroup.Item
                      key={message._id}
                      className={
                        message.status === "unseen" && "font-weight-bold"
                      }
                    >
                      <Message message={message} />
                    </ListGroup.Item>
                  ))}
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ListMessages;
