import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import messagesActions from "../redux/actions/messagesActions";
import { Container, Row, Col, Card } from "react-bootstrap";
import EditModal from "../components/EditModal";
import Moment from "react-moment";

const MessageDetailPage = ({ match }) => {
  const messagesList = useSelector((state) => state.messages.messagesList);
  const { selectedMessage } = useSelector((state) => state.messages);

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
    <Container>
      {selectedMessage ? (
        <Card>
          <Card.Text>
            <Row>
              <Col md={5}>
                <div>{selectedMessage.from.name}</div>
              </Col>
              <Col className="px-0" md={5}>
                <Moment format="DD/MM/yyyy">{selectedMessage.createdAt}</Moment>
              </Col>
              <Col className="px-0" md={2}>
                <EditModal message={selectedMessage} />
              </Col>
            </Row>
          </Card.Text>
          <Card.Body>
            <Card.Title>{selectedMessage.title}</Card.Title>
            <Card.Text>{selectedMessage.content}</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <h2>Loading</h2>
      )}
    </Container>
  );
};

export default MessageDetailPage;
