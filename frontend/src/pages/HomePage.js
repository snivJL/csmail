import React from "react";

import { Row, Col, Container } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container>
      <Row className="text-center mt-4">
        <Col md={12}>
          <h1>Welcome to CSMail</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
