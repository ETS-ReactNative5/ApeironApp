import logo from './logo.svg';
import './App.css';
import HomePage from "./pages/HomePage";
import { HashRouter as Router, Link, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
			<Switch>
				<Link exact to="/" path="/" component={HomePage} />
        </Switch>
		</Router>
 
  );
}

export default App;
