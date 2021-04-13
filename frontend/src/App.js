import logo from './logo.svg';
import './App.css';
import HomePage from "./pages/HomePage";
import { HashRouter as Router, Link, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
			<Switch>
				<Link exact to="/" path="/" component={HomePage} />
				<Link exact to="/login" path="/login" component={LoginPage} />
				<Link exact to="/registration" path="/registration" component={RegisterPage} />
        </Switch>
		</Router>
 
  );
}

export default App;
