import React, { Component } from "react";
import Header from "../components/Header";
import TopBar from "../components/TopBar";
import Zenska from "../static/zenska-obicna.png";
import Muska from "../static/naslovna-muska-obicna.png";

import { Redirect } from "react-router-dom";
class TShirts extends Component {
    state = {
		redirectToWomen: false,
		redirectToMen: false,
		redirectToWomenOver: false,
		redirectToMenOver: false,
		unauthorizedRedirect: false,
	};

	handleImgClick = (imgNum) => {
		if (imgNum === 1) this.setState({ redirectToWomen: true });
		else this.setState({ redirectToMen: true });
	};

	handleImgMouseOver = (imgNum) => {
		if (imgNum === 1) this.setState({ redirectToWomenOver: true });
		else this.setState({ redirectToMenOver: true });
	};

	handleImgMouseOut = (imgNum) => {
		if (imgNum === 1) this.setState({ redirectToWomenOver: false });
		else this.setState({ redirectToMenOver: false });
	};
	render() {
	
        if (this.state.redirectToWomen) return <Redirect push to="/tshirts-women" />;
		else if (this.state.redirectToMen) return <Redirect push to="/tshirts-men" />;

		if (this.state.unauthorizedRedirect) return <Redirect push to="/unauthorized" />;
		return (
			<React.Fragment>
				<TopBar />
				<Header />
				<div className="container" style={{ marginTop: "10%" }}>
					<h5 className=" text-center mb-0 mt-2 text-uppercase">Select a desired product</h5>
					<div className="control-group mt-5">
						<div className="form-row justify-content-center align-middle ">
							<div
								className="form-col mt-5 mr-5 rounded p-3"
								onMouseOut={() => this.handleImgMouseOut(1)}
								onMouseOver={() => this.handleImgMouseOver(1)}
								onClick={() => this.handleImgClick(1)}
								style={{ backgroundColor: this.state.redirectToWomenOver ? "silver" : "transparent", cursor: "pointer" }}
							>
								<div>
									<img className="img-fluid" src={Zenska} width="170em" />
								</div>
								<div className="mt-3 text-center" style={{ fontSize: "2em" }}>
									Women T-Shirts
								</div>
							</div>
							<div
								className="form-col mt-5 mr-5 ml-5 rounded p-3"
								onMouseOut={() => this.handleImgMouseOut(2)}
								onMouseOver={() => this.handleImgMouseOver(2)}
								onClick={() => this.handleImgClick(2)}
								style={{ backgroundColor: this.state.redirectToMenOver ? "silver" : "transparent", cursor: "pointer" }}
							>
								<div>
									<img className="img-fluid" src={Muska} width="170em" />
								</div>
								<div className="mt-3 text-center" style={{ fontSize: "2em" }}>
									Men T-Shirts
								</div>
							</div>
							
						</div>
					</div>
				</div>
			
			</React.Fragment>
		);
	}
}

export default TShirts;
