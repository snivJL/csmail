import React from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import messagesActions from "../redux/actions/messagesActions";
import { useDispatch } from "react-redux";

const WriteMessage = () => {
  const dispatch = useDispatch();
  const validate = (values) => {
    const errors = {};
    if (!values.content) {
      errors.content = "Required";
    }
    if (!values.title) {
      errors.title = "Required";
    }

    if (!values.to) {
      errors.to = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.to)) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      to: "",
      title: "",
      content: "",
    },
    validate,
    onSubmit: (values) => {
      dispatch(messagesActions.writeMessage(values));
    },
  });

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="To"
                name="to"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.to}
              />
              {formik.touched.to && formik.errors.to ? (
                <div>{formik.errors.to}</div>
              ) : null}
            </Form.Group>

            <Form.Group controlId="formBasicText">
              <Form.Control
                type="text"
                placeholder="Subject"
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              {formik.touched.title && formik.errors.title ? (
                <div>{formik.errors.title}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicText">
              <Form.Control
                as="textarea"
                style={{ minHeight: "20rem" }}
                type="text"
                placeholder="Compose message"
                name="content"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.content}
              />
              {formik.touched.content && formik.errors.content ? (
                <div>{formik.errors.content}</div>
              ) : null}
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default WriteMessage;
