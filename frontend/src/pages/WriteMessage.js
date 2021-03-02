import React, { useEffect } from "react";
import { Alert, Col, Row, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import messagesActions from "../redux/actions/messagesActions";
import authActions from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import ListMessages from "../components/ListMessages";

const WriteMessage = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.writeMessage.error);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) dispatch(authActions.getUser());
  }, [dispatch]);

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
      errors.to = "Invalid email address";
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
      values.from = user._id;
      dispatch(messagesActions.writeMessage(values));
    },
  });

  return (
    <Row>
      <Col className="pr-0" style={{ maxWidth: "10rem" }}>
        <Sidebar />
      </Col>
      <Col style={{ maxWidth: "20rem" }}>
        <ListMessages />
      </Col>
      <Col>
        {error && <Alert>{error}</Alert>}
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
  );
};

export default WriteMessage;
