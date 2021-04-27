import logo from './logo.svg';
import './App.css';
import HomePage from "./pages/HomePage";
import { HashRouter as Router, Link, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TShirts from "./pages/TShirts";
import Hoodies from "./pages/Hoodies";
import TShirtsWomen from "./pages/TShirts-women";
import TShirtsMen from "./pages/TShirts-men";
import HoodiesWomen from "./pages/Hoodies-women";
import HoodiesMen from "./pages/Hoodies-men";
import AddItem from "./pages/AddItem";
import Hats from "./pages/Hats";
import MyOrders from "./pages/MyOrders";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
  return (
    <Router>
			<Switch>
				<Link exact to="/" path="/" component={HomePage} />
				<Link exact to="/login" path="/login" component={LoginPage} />
				<Link exact to="/registration" path="/registration" component={RegisterPage} />
				<Link exact to="/tshirts" path="/tshirts" component={TShirts} />
				<Link exact to="/hoodies" path="/hoodies" component={Hoodies} />
				<Link exact to="/tshirts-women" path="/tshirts-women" component={TShirtsWomen} />
				<Link exact to="/tshirts-men" path="/tshirts-men" component={TShirtsMen} />
				<Link exact to="/hoodies-men" path="/hoodies-men" component={HoodiesMen} />
				<Link exact to="/hoodies-women" path="/hoodies-women" component={HoodiesWomen} />
				<Link exact to="/additem" path="/additem" component={AddItem} />
				<Link exact to="/hats" path="/hats" component={Hats} />
				<Link exact to="/myReservations" path="/myReservations" component={MyOrders} />
				<Link exact to="/userChangeProfile" path="/userChangeProfile" component={UserProfilePage} />
        </Switch>
		</Router>
 
  );
}

export default App;
