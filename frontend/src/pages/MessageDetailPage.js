import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import messagesActions from "../redux/actions/messagesActions";
import { Container, Row, Col, Card } from "react-bootstrap";
import EditModal from "../components/EditModal";
import Moment from "react-moment";

const MessageDetailPage = ({ match }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(messagesActions.getSingleMessage(match.params.id));
  }, [dispatch, match.params.id]);
  const { messagesList } = useSelector((state) => state.messages);
  const message = messagesList.find((mess) => mess._id === match.params.id);
  return (
    <Container>
      <Card>
        <Card.Text>
          <Row>
            <Col md={5}>
              <div>{message.from.name}</div>
            </Col>
            <Col className="px-0" md={5}>
              <Moment format="DD/MM/yyyy">{message.createdAt}</Moment>
            </Col>
            <Col className="px-0" md={2}>
              <EditModal message={message} />
            </Col>
          </Row>
        </Card.Text>
        <Card.Body>
          <Card.Title>{message.title}</Card.Title>
          <Card.Text>{message.content}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MessageDetailPage;
