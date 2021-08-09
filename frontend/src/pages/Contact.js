import React, { Component } from "react";
import Header from "../components/Header";
import TopBar from "../components/TopBar";
import { BASE_URL } from "../constants.js";
import Axios from "axios";
import { YMaps, Map } from "react-yandex-maps";
import getAuthHeader from "../GetHeader";
import { Redirect } from "react-router-dom";
import HeadingSuccessAlert from "../components/HeadingSuccessAlert";
import HeadingAlert from "../components/HeadingAlert";

import ModalDialog from "../components/ModalDialog";
const mapState = {
	center: [44, 21],
	zoom: 8,
	controls: [],
};

class Contact extends Component {
	state = {
		id: "",
		email: "",
		password: "",
		firstname: "",
		surname: "",
		emaill: "",
		phone: "",
		message: "",
		address: "",
		phoneNumber: "",
		nameError: "none",
		surnameError: "none",
		addressError: "none",
		phoneError: "none",
		phoneValidateError: "none",
		openModal: false,
		openModal2: false,
		hiddenEditInfo: true,
		redirect: false,
		hiddenSuccessAlert: true,
		successHeader: "",
		successMessage: "",
		hiddenFailAlert: true,
		failHeader: "",
		failMessage: "",
		addressNotFoundError: "none",
		aboutUs: ""
	};

	constructor(props) {
		super(props);
		this.addressInput = React.createRef();
	}

	hasRole = (reqRole) => {
		let roles = JSON.parse(localStorage.getItem("keyRole"));
		if (roles === null) return false;

		if (reqRole === "*") return true;

		for (let role of roles) {
			if (role === reqRole) return true;
		}
		return false;
	};

	onYmapsLoad = (ymaps) => {
		this.ymaps = ymaps;

		if (this.state.address !== "") {
			console.log(this.state);
			this.ymaps
				.geocode([this.state.address.latitude, this.state.address.longitude], {
					results: 1,
				})
				.then(function (res) {
					var firstGeoObject = res.geoObjects.get(0);
					document.getElementById("suggest").setAttribute("value", firstGeoObject.getAddressLine());
					console.log(firstGeoObject.getAddressLine());
				});

			new this.ymaps.SuggestView(this.addressInput.current, {
				provider: {
					suggest: (request, options) => this.ymaps.suggest(request),
				},
			});
		}
	};

	componentDidMount() {
	
			this.addressInput = React.createRef();
			Axios.get(BASE_URL + "/api/admin", { validateStatus: () => true})
				.then((res) => {
					if (res.status !== 401) {
						console.log(res.data)
						this.setState({
							id: res.data.Id,
							email: res.data.contactEmail,
							phonenumber: res.data.phoneNumber,
							address: res.data.address,
							aboutUs: res.data.aboutUs,

						});

					} else {
						this.setState({ redirect: true });
					}
				})
				.catch((err) => {
					console.log(err);
				});
		
	}

	handleEmailChange = (event) => {
		this.setState({ email: event.target.value });
	};

	handleFirstNameChange = (event) => {
		this.setState({ firstName: event.target.value });
	};

	handleSurnameChange = (event) => {
		this.setState({ surname: event.target.value });
	};

	handleEmaillChange = (event) => {
		this.setState({ emaill: event.target.value });
	};

	handlePhoneChange = (event) => {
		this.setState({ phone: event.target.value });
	};

	handleMessageChange = (event) => {
		this.setState({ message: event.target.value });
	};

	handlePhoneNumberChange = (event) => {
		this.setState({ phonenumber: event.target.value });
	};

	handleAboutUsChange = (event) => {
		this.setState({ aboutUs: event.target.value });
	};

	validateForm = (userDTO) => {
		this.setState({
			cityError: "none",
			addressError: "none",
			phoneError: "none",
			phoneValidateError: "none",
			addressNotFoundError: "none",
		});

		//const regexPhone = /^([+]?[0-9]{3,6}[-]?[\/]?[0-9]{3,5}[-]?[\/]?[0-9]*)$/;
		//console.log(regexPhone.test(userDTO.phoneNumber));
		if (this.addressInput.current.value === "") {
			this.setState({ addressError: "initial" });
			return false;
		} else if (userDTO.phoneNumber === "") {
			this.setState({ phoneError: "initial" });
			return false;

		}
		return true;
	};



	handleSuccessModalClose = () => {
		this.setState({ openSuccessModal: false });
	};

	handlePasswordModalClose = () => {
		this.setState({ openPasswordModal: false });
	};

	handleChangeInfo = () => {

		this.setState({
			hiddenSuccessAlert: true,
			successHeader: "",
			successMessage: "",
			hiddenFailAlert: true,
			failHeader: "",
			failMessage: "",
		});

		let street;
		let city;
		let country;
		let latitude;
		let longitude;
		let found = true;

		this.ymaps
			.geocode(this.addressInput.current.value, {
				results: 1,
			})
			.then(function (res) {
				if (typeof res.geoObjects.get(0) === "undefined") found = false;
				else {
					var firstGeoObject = res.geoObjects.get(0),
						coords = firstGeoObject.geometry.getCoordinates();
					latitude = coords[0];
					longitude = coords[1];
					country = firstGeoObject.getCountry();
					street = firstGeoObject.getThoroughfare();
					city = firstGeoObject.getLocalities().join(", ");
				}
			})
			.then((res) => {
				let userDTO = {
					address: { street, country, city, latitude, longitude },
					phoneNumber: this.state.phonenumber,
					contactEmail: this.state.email,
					aboutUs: this.state.aboutUs,

				};
				console.log(userDTO);

				if (this.validateForm(userDTO)) {
					if (found === false) {
						this.setState({ addressNotFoundError: "initial" });
					} else {
						console.log(userDTO);
						Axios.put(BASE_URL + "/api/admin/update", userDTO, {
							validateStatus: () => true,
							headers: { Authorization: getAuthHeader() },
						})
							.then((res) => {
								if (res.status === 400) {
									this.setState({ hiddenFailAlert: false, failHeader: "Bad request", failMessage: "Invalid argument." });
								} else if (res.status === 500) {
									this.setState({ hiddenFailAlert: false, failHeader: "Internal server error", failMessage: "Server error." });
								} else if (res.status === 204) {
									console.log("Success");
								
									this.setState({
										hiddenSuccessAlert: false,
										successHeader: "Success",
										successMessage: "You successfully updated your information.",
										hiddenEditInfo: true,
									});
								}
							})
							.catch((err) => {
								console.log(err);
							});
					}
				}
			});
	};

	handleSend = () => {
		let messageDTO = {
			firstName: this.state.firstName,
			surname: this.state.surname,
			email: this.state.emaill,
			phoneNumber: this.state.phone,
			message: this.state.message
		}

		Axios.post(BASE_URL + "/api/users/sendMessage",messageDTO, {
            validateStatus: () => true,
           
        })
            .then((res) => {
               
                if (res.status === 400) {
                    this.setState({ hiddenFailAlert: false, failHeader: "Bad request", failMessage: "Invalid argument." });
                } else if (res.status === 500) {
                    this.setState({ hiddenFailAlert: false, failHeader: "Internal server error", failMessage: "Server error." });
                } else if (res.status === 204) {
					this.setState({ openModal: true });
                    console.log("Success");
                   
                }
            })
            .catch((err) => {
                console.log(err);
            });

	};

	handleEditInfoClick = () => {
		this.setState({ hiddenEditInfo: false });
	};

	handleCloseAlertPassword = () => {
		this.setState({ hiddenPasswordErrorAlert: true });
	};

	handleCloseAlertSuccess = () => {
		this.setState({ hiddenSuccessAlert: true });
	};

	handleCloseAlertFail = () => {
		this.setState({ hiddenFailAlert: true });
	};


	render() {
		if (this.state.redirect) return <Redirect push to="/unauthorized" />;

		return (
			<React.Fragment>
				<TopBar />
				<Header />

				<div className="container" style={{ marginTop: "8%" }}>
					<HeadingSuccessAlert
						hidden={this.state.hiddenSuccessAlert}
						header={this.state.successHeader}
						message={this.state.successMessage}
						handleCloseAlert={this.handleCloseAlertSuccess}
					/>
					<HeadingAlert
						hidden={this.state.hiddenFailAlert}
						header={this.state.failHeader}
						message={this.state.failMessage}
						handleCloseAlert={this.handleCloseAlertFail}
					/>
					<h5 className=" text-center  mb-0 text-uppercase" style={{ marginTop: "2rem" }}>
						User information
					</h5>
					<div className="row mt-5">
						<div className="col shadow p-3 bg-white rounded">
							<h5 className=" text-center text-uppercase">Contact Information</h5>
							<form id="contactForm" name="sentMessage">
								<div className="control-group">
									<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>

										<input
											readOnly={this.state.hiddenEditInfo}
											className={!this.state.hiddenEditInfo === false ? "form-control-plaintext" : "form-control"}
											placeholder="Contact email"
											type="text"
											onChange={this.handleEmailChange}
											value={this.state.email}
										/>
									</div>

								</div>

								<div className="control-group">
									<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>

										<input
											readOnly={this.state.hiddenEditInfo}
											className={!this.state.hiddenEditInfo === false ? "form-control-plaintext" : "form-control"}
											id="suggest"
											ref={this.addressInput}
											placeholder="Address"
										/>
									</div>
									<YMaps
										query={{
											load: "package.full",
											apikey: "b0ea2fa3-aba0-4e44-a38e-4e890158ece2",
											lang: "en_RU",
										}}
									>
										<Map
											style={{ display: "none" }}
											state={mapState}
											onLoad={this.onYmapsLoad}
											instanceRef={(map) => (this.map = map)}
											modules={["coordSystem.geo", "geocode", "util.bounds"]}
										></Map>
									</YMaps>
									<div className="text-danger" style={{ display: this.state.addressError }}>
										Address must be entered.
									</div>
									<div className="text-danger" style={{ display: this.state.addressNotFoundError }}>
										Sorry. Address not found. Try different one.
									</div>
								</div>
								<div className="control-group">
									<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>

										<input
											readOnly={this.state.hiddenEditInfo}
											className={!this.state.hiddenEditInfo === false ? "form-control-plaintext" : "form-control"}
											placeholder="Phone number"
											type="text"
											onChange={this.handlePhoneNumberChange}
											value={this.state.phonenumber}
										/>
									</div>
									<div className="text-danger" style={{ display: this.state.phoneError }}>
										Phone number must be entered.
									</div>
								</div>

								<div className="control-group">
									<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>

										<input
											readOnly={this.state.hiddenEditInfo}
											className={!this.state.hiddenEditInfo === false ? "form-control-plaintext" : "form-control"}
											placeholder="About us"
											type="text"
											onChange={this.handleAboutUsChange}
											value={this.state.aboutUs}
										/>
									</div>

								</div>

								<div className="form-group text-center" hidden={this.state.hiddenEditInfo}>
									<button
										style={{ background: "#1977cc", marginTop: "15px" }}
										onClick={this.handleChangeInfo}
										className="btn btn-primary btn-xl"
										id="sendMessageButton"
										type="button"
									>
										Change information
									</button>
								</div>
								<br />

								<div className="form-group" hidden={!this.hasRole("ROLE_ADMIN")}>
									<div className="form-group controls mb-0 pb-2">
										<div className="form-row justify-content-center">
											<div className="form-col" hidden={!this.state.hiddenEditInfo}>
												<button
													onClick={this.handleEditInfoClick}
													className="btn btn-outline-primary btn-xl"
													id="sendMessageButton"
													type="button"
												>
													Edit Info
												</button>
											</div>


										</div>
									</div>
								</div>
							</form>
						</div>

					</div>





					<div className="row mt-5"  hidden={this.hasRole("ROLE_ADMIN")} >
						<div className="col shadow p-3 bg-white rounded">
							<h5 className=" text-center text-uppercase">Contact us</h5>
							<form id="contactForm" name="sentMessage">
								<div className="control-group">
									<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>

										<input
											className="form-control"
											placeholder="First name"
											type="text"
											onChange={this.handleFirstNameChange}
											value={this.state.firstName}
										/>
									</div>

								</div>

								<div className="control-group">
									<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>

										<input
											className="form-control"
											placeholder="Last name"
											type="text"
											onChange={this.handleSurnameChange}
											value={this.state.surname}
										/>
									</div>

								</div>

								<div className="control-group">
									<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>

										<input
											className="form-control"
											placeholder="Email"
											type="text"
											onChange={this.handleEmaillChange}
											value={this.state.emaill}
										/>
									</div>

								</div>

								<div className="control-group">
									<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>

										<input
											className="form-control"
											placeholder="Phone number"
											type="text"
											onChange={this.handlePhoneChange}
											value={this.state.phone}
										/>
									</div>

								</div>

								<div className="control-group">
									<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>

										<input
											className="form-control"
											placeholder="Message"
											type="text"
											onChange={this.handleMessageChange}
											value={this.state.message}
										/>
									</div>

								</div>
								

								<div className="form-group text-center" >
									<button
										style={{ background: "#1977cc", marginTop: "15px" }}
										onClick={this.handleSend}
										className="btn btn-primary btn-xl"
										id="sendMessageButton"
										type="button"
									>
										Send
									</button>
								</div>
								<br />

								
							</form>
						</div>

					</div>
				</div>
				<ModalDialog
                    show={this.state.openModal}
                    onCloseModal={this.handleModalClose}
                    header="Success"
                    text="You have successfully sent an email."
                />

			</React.Fragment>
		);
	}
}

export default Contact;
