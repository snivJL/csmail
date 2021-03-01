import React, { useEffect } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import ProfileModal from "../components/ProfileModal";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import authActions from "../redux/actions/authActions";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  console.log("USER", JSON.parse(user));
  const logoutHandler = () => dispatch(authActions.logout());

  return (
    <header>
      <Navbar
        variant="light"
        bg="light"
        expand="lg"
        style={{ padding: "1rem 1rem" }}
      >
        <Navbar.Brand>
          <Link to="/">CSMail</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-4 mr-auto">
            {user ? (
              <>
                <Link to="/compose">
                  <Nav.Link id="nav-new-message" href="#link">
                    <i className="fas fa-external-link-alt"></i>New Message
                  </Nav.Link>
                </Link>

                <NavDropdown title={JSON.parse(user).user.name} id="username">
                  <NavDropdown.Item>
                    <ProfileModal />
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link>
                  <Link to="/register">Register</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/login">Log in</Link>
                </Nav.Link>
              </>
            )}
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
