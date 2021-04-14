import React, { Component } from "react";
import Header from "../components/Header";
import TopBar from "../components/TopBar";
import Zenska from "../static/zenska-obicna.png";
import Muska from "../static/naslovna-muska-obicna.png";

import { Redirect } from "react-router-dom";
class TShirtsWomen extends Component {
   
	render() {
	
       
		return (
			<React.Fragment>
				<TopBar />
				<Header />
				<div className="container" style={{ marginTop: "10%" }}>
					<h5 className=" text-center mb-0 mt-2 text-uppercase">Select a desired product</h5>
					
				
				</div>
			
			</React.Fragment>
		);
	}
}

export default TShirtsWomen;
