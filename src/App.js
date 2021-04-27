import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import PrivateRoute from "./components/PrivateRoute";
import SignupForm from "./components/SignupForm";
import AuthProvider from "./context/auth";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={SignupForm} />
          <Route exact path="/forgot-password" component={ForgotPasswordForm} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
