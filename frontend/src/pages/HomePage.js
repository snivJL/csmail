import React from "react";
import Sidebar from "../components/Sidebar";
import ListMessages from "../components/ListMessages";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import WriteMessage from "../pages/WriteMessage";
import MessageDetailPage from "../pages/MessageDetailPage";
import { Row, Col } from "react-bootstrap";

const HomePage = () => {
  const token = localStorage.getItem("token");

  return (
    <Row className="mt-4">
      <Col className="pr-0" style={{ maxWidth: "10rem" }}>
        <Sidebar />
      </Col>
      <Col style={{ maxWidth: "20rem" }}>
        <ListMessages />
      </Col>
      <Col>
        <Switch>
          <PrivateRoute path="/compose" component={WriteMessage} />
          <PrivateRoute path="/message/:id" component={MessageDetailPage} />
        </Switch>
      </Col>
    </Row>
  );
};

export default HomePage;
