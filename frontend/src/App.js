import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import WriteMessage from "./pages/WriteMessage";
import Sidebar from "./components/Sidebar";
import MessageDetailPage from "./pages/MessageDetailPage";
import ListMessages from "./components/ListMessages";
import { Row, Col } from "react-bootstrap";

import { BrowserRouter as Router, Route } from "react-router-dom";
const token = localStorage.getItem("token");

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Row>
            {token && (
              <>
                <Col className="pr-0" style={{ maxWidth: "10rem" }}>
                  <Sidebar />
                </Col>
                <Col style={{ maxWidth: "20rem" }}>
                  <ListMessages />
                </Col>
              </>
            )}
            <Col md={6}>
              <Route path="/" component={HomePage} exact />
              <Route path="/compose" component={WriteMessage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/message/:id" component={MessageDetailPage} />
            </Col>
          </Row>
        </main>
      </div>
    </Router>
  );
}

export default App;
