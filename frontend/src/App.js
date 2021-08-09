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
import AllOrders from "./pages/AllOrders";
import Contact from "./pages/Contact";
import Change from "./pages/Change";
import RegisterDelivery from "./pages/RegisterDelivery";
import Delivery from "./pages/Delivery";
import QRCodes from "./pages/QRCodes";
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
				<Link exact to="/allOrders" path="/allOrders" component={AllOrders} />
				<Link exact to="/registerDelivery" path="/registerDelivery" component={RegisterDelivery} />
				<Link exact to="/contact" path="/contact" component={Contact} />
				<Link exact to="/change" path="/change" component={Change} />
				<Link exact to="/delivery" path="/delivery" component={Delivery} />
				<Link exact to="/qrCodes" path="/qrCodes" component={QRCodes} />
        </Switch>
		</Router>
 
  );
}

export default App;
