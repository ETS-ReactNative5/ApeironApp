import React, { Component } from "react";
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Axios from "axios";
import { BASE_URL } from "../constants.js";
import PharmacyLogo from "../static/naslovna-duks.png";
import "../App.js";
import { Redirect } from "react-router-dom";
import Order from "../components/Order";

class TShirtsWomen extends Component {
	state = {
		tshirts: [],
		formShowed: false,
		name: "",
		city: "",
		gradeFrom: "",
		gradeTo: "",
		distanceFrom: "",
		distanceTo: "",
		showingSearched: false,
		showingSorted: false,
		currentLatitude: null,
		currentLongitude: null,
		sortIndicator: 0,
		redirect: false,
		redirectUrl: "",
		showOrderModal: false,
		handleOrderModalClose: false,
		shirt: "",
		selectedColor: "",
		showedColors: [],
		colors: [],
		selectedSize: "",
		showedSizes: [],
		sizes: [],


	};

	handleNameChange = (event) => {
		this.setState({ name: event.target.value });
	};

	getCurrentCoords = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				this.setState({
					currentLatitude: position.coords.latitude,
					currentLongitude: position.coords.longitude,
				});
			});
		}
	};

	componentDidMount() {
		this.getCurrentCoords();
		Axios.get(BASE_URL + "/api/items/tshirt-women")
		.then((res) => {
			this.setState({ tshirts: res.data });
			console.log(res.data);
		})
		.catch((err) => {
			console.log(err);
		});
		
	}

	hangleFormToogle = () => {
		this.setState({ formShowed: !this.state.formShowed });
	};

	handleGradeFromChange = (event) => {
		if (event.target.value < 0) this.setState({ gradeFrom: 0 });
		else this.setState({ gradeFrom: event.target.value });
	};

	handleGradeToChange = (event) => {
		if (event.target.value > 5) this.setState({ gradeTo: 5 });
		else this.setState({ gradeTo: event.target.value });
	};

	handleDistanceFromChange = (event) => {
		this.setState({ distanceFrom: event.target.value });
	};

	handleDistanceToChange = (event) => {
		this.setState({ distanceTo: event.target.value });
	};

	handleCityChange = (event) => {
		this.setState({ city: event.target.value });
	};

	

	handleClickOnPharmacy = (id) => {
		this.setState({ shirt: id });
		this.setState({ showOrderModal: true });
		this.setState({ colors: id.colors });
	
	};

	handleOrderModalClose = () => {
		this.setState({ showOrderModal: false });
	};

	handleColorChange = (e) => {
		
		let u = [];
		this.setState({ selectedColor: e.target.value }, () => {
			console.log(this.state);
		});
		this.state.colors.forEach((chain) => {
			if (chain.color === e.target.value) {
				u.push(chain.sizes);
			}
		});


		this.state.sizes = u;
		this.setState({ sizes: u });
		this.setState({ showedSizes: u });
		this.changeEndEntityChain(e.target.value);
	};

	changeEndEntityChain = (e) => {
		if (e === "") {
			this.setState({ showedColors: this.state.colors });
		} else {
			let u = [];
			this.state.colors.forEach((chain) => {
				if (chain.color !== e) {
					u.push(chain);
				}
			});

			this.setState({ showedColors: u });
		}
	};

	handleSizeChange = (e) => {
		this.setState({ selectedSize: e.target.value }, () => {
			console.log(this.state);
		});
		this.changeEndEntitySizeChain(e.target.value);
	};

	changeEndEntitySizeChain = (e) => {
		if (e === "") {
			this.setState({ showedSizes: this.state.sizes });
		} else {
			let u = [];
			this.state.sizes.forEach((chain) => {
				if (chain.size !== e) {
					u.push(chain);
				}
			});

			this.setState({ showedSizes: u });
		}
	};

	render() {
		if (this.state.redirect) return <Redirect push to={this.state.redirectUrl} />;

		return (
			<React.Fragment>
				<TopBar />
				<Header />

				<div className="container" style={{ marginTop: "10%" }}>
					<h5 className=" text-center mb-0 mt-2 text-uppercase">Women T-shirts</h5>

					<div className="form-group">
						<div className="form-group controls">
							<div className="form-row">
								<button className="btn btn-outline-primary btn-xl" type="button" onClick={this.hangleFormToogle}>
									<i className="icofont-rounded-down mr-1"></i>
									Search pharmacies
								</button>
								<div className={this.state.showingSearched ? "ml-2" : "ml-2 collapse"}>
									<button type="button" className="btn btn-outline-secondary" onClick={this.handleResetSearch}>
										<i className="icofont-close-line mr-1"></i>Reset search criteria
									</button>
								</div>
							</div>
						</div>
					</div>
					<form className={this.state.formShowed ? "form-inline mt-3" : "form-inline mt-3 collapse"} width="100%" id="formCollapse">
						<div className="form-group mb-2" width="100%">
					
						</div>
						<div>
							<button style={{ background: "#1977cc" }} onClick={this.handleSearch} className="btn btn-primary btn-xl" type="button">
								<i className="icofont-search mr-1"></i>
								Search
							</button>
						</div>
					</form>

					<div className="form-group">
						<div className="form-group controls mb-0 pb-2">
							<div className="form-row mt-3">
								<div className="form-col">
									<div className="dropdown">
										<button
											className="btn btn-primary dropdown-toggle"
											type="button"
											id="dropdownMenu2"
											data-toggle="dropdown"
											aria-haspopup="true"
											aria-expanded="false"
										>
											Sort by
										</button>
										<div className="dropdown-menu" aria-labelledby="dropdownMenu2">
											
										</div>
									</div>
								</div>
								<div className="form-col ml-3">
									<div className={this.state.showingSorted ? "form-group" : "form-group collapse"}>
										<button type="button" className="btn btn-outline-secondary" onClick={this.handleResetSort}>
											<i className="icofont-close-line mr-1"></i>Reset sort criteria
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					<table className="table table-hover" style={{ width: "100%", marginTop: "3rem" }}>
						<tbody>
							{this.state.tshirts.map((pharmacy) => (
								<tr
									id={pharmacy.id}
									key={pharmacy.id}
									style={{ cursor: "pointer" }}
									onClick={() => this.handleClickOnPharmacy(pharmacy)}
								>
									<td width="130em">
										<img className="img-fluid" src={PharmacyLogo} width="70em" />
									</td>
									<td>
										<div>
											<b>Name: </b> {pharmacy.name}
										</div>
										<div>
											<b>Price: </b> {pharmacy.price}
										</div>
										<div>
										<b>Available colors: </b>
										{pharmacy.colors.map((color) => (
											<div> {color.color}
											
													{color.sizes.map((size) => (
														<td> {size.size} available: {size.quantity}</td>
												
												
														))}
											 </div>
													
										
										))}

										</div>


										
										<div>
											<b>Grade: </b> {pharmacy.id}
											<i className="icofont-star" style={{ color: "#1977cc" }}></i>
										</div>



										<div>  <button
                                        style={{
                                            background: "#1977cc",
                                            marginTop: "15px",
                                            marginLeft: "40%",
                                            width: "20%",
                                        }}
                                        onClick={this.handleSignUp}
                                        className="btn btn-primary btn-xl"
                                        id="sendMessageButton"
                                        type="button"
                                    >
                                        Reserve
									</button></div>
										
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<Order
					buttonName="Send reservation"
					header="Make new reservation"
					show={this.state.showOrderModal}
					onCloseModal={this.handleOrderModalClose}
					handleColorChange={this.handleColorChange}
					handleSizeChange={this.handleSizeChange}
					shirt={this.state.shirt}
					showedColors={this.state.colors}
					selectedColor = {this.state.selectedColor}
					showedSizes={this.state.sizes}
					selectedSize = {this.state.selectedSize}
				/>
			</React.Fragment>
		);
	}
}

export default TShirtsWomen;

