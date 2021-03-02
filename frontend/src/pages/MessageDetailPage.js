import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import messagesActions from "../redux/actions/messagesActions";
import Sidebar from "../components/Sidebar";
import ListMessages from "../components/ListMessages";
import { Container, Row, Col, Card, Alert, Spinner } from "react-bootstrap";
import EditModal from "../components/EditModal";
import Moment from "react-moment";

const MessageDetailPage = ({ match }) => {
  const messagesList = useSelector((state) => state.messages.messagesList);
  const { selectedMessage, error } = useSelector((state) => state.messages);

  const dispatch = useDispatch();
  // const loadedMessage = messagesList.find(
  //   (mess) => (mess._id = match.params.id)
  // );
  useEffect(() => {
    dispatch(messagesActions.getSingleMessage(match.params.id));
  }, [dispatch, match.params.id]);
  useEffect(() => {
    if (!messagesList) dispatch(messagesActions.getMessages());
  }, [dispatch, match.params.id]);

  return (
    <Row>
      <Col className="pr-0" style={{ maxWidth: "10rem" }}>
        <Sidebar />
      </Col>
      <Col style={{ maxWidth: "20rem" }}>
        <ListMessages />
      </Col>
      <Col className="d-flex justify-content-center">
        {selectedMessage ? (
          <Card className="p-2 w-100">
            <Card.Body>
              <Card.Title className="font-weight-bold d-flex justify-content-between">
                {selectedMessage.title}
                <EditModal message={selectedMessage} />
              </Card.Title>
              <Card.Text>
                <Row className="d-flex justify-content-between mb-4">
                  <Col className="font-weight-bolder" md={9}>
                    {`${selectedMessage.from.name} <${selectedMessage.from.email}> `}
                  </Col>
                  <Col md={3}>
                    <Moment format="DD/MM/yyyy">
                      {selectedMessage.createdAt}
                    </Moment>{" "}
                    {"  "}
                    <span>
                      (<Moment fromNow>{selectedMessage.createdAt}</Moment>)
                    </span>
                  </Col>
                </Row>
              </Card.Text>
              <Container>
                <Row>
                  <Col>
                    {" "}
                    <Card.Text>{selectedMessage.content}</Card.Text>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        ) : error ? (
          <Alert variant="warning">
            {error.msg}... Please refresh the page and log in again
          </Alert>
        ) : (
          <Spinner animation="grow" variant="primary" />
        )}
      </Col>
    </Row>
  );
};

export default MessageDetailPage;
