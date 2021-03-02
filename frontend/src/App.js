import "./App.css";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import WriteMessage from "./pages/WriteMessage";
import MessageDetailPage from "./pages/MessageDetailPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Switch>
            <PrivateRoute path="/" component={HomePage} exact />
            <PrivateRoute path="/compose" component={WriteMessage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
            <PrivateRoute path="/message/:id" component={MessageDetailPage} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
