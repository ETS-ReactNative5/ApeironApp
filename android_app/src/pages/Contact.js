import React, { Component } from "react";
import { BASE_URL } from "../../constants.js";
import Axios from "axios";
import getAuthHeader from "../../GetHeader";
import { Redirect } from "react-router-dom";
import Modal from 'react-native-modal';
const API_KEY = 'AIzaSyAsno5WRMrrU_XX-ur8CBRtndECG-0kAfs';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	TouchableOpacity,
	Button,
	TextInput,
	Image,
	Table,
	ScrollView,
	TouchableHighlight
} from 'react-native';
import ModalDialog from "../components/ModalDialog";

import SyncStorage from 'sync-storage';
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
		nameError: false,
		surnameError: false,
		addressError: false,
		phoneError: false,
		phoneValidateError: false,
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
		addressNotFoundError: false,
		aboutUs: "",

		aStreet: "",
		aCity: "",
		aCountry: "",

	};

	constructor(props) {
		super(props);
		this.addressInput = React.createRef();
	}

	hasRole = (reqRole) => {
		let roles = JSON.parse(SyncStorage.get("keyRole"));
		if (roles === null) return false;

		if (reqRole === "*") return true;

		for (let role of roles) {
			if (role === reqRole) return true;
		}
		return false;
	};


	componentDidMount() {


		Axios.get(BASE_URL + "/api/admin", { validateStatus: () => true })
			.then((res) => {
				if (res.status !== 401) {
					console.log(res.data)
					this.setState({
						id: res.data.Id,
						email: res.data.contactEmail,
						phonenumber: res.data.phoneNumber,
						address: res.data.address,
						aboutUs: res.data.aboutUs,
						aStreet: res.data.address.street,
						aCity: res.data.address.city,
						aCountry: res.data.address.country,
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
		this.setState({ email: event.nativeEvent.text });
	};

	handleFirstNameChange = (event) => {
		this.setState({ firstName: event.nativeEvent.text });
	};

	handleSurnameChange = (event) => {
		this.setState({ surname: event.nativeEvent.text });
	};

	handleEmaillChange = (event) => {
		this.setState({ emaill: event.nativeEvent.text });
	};

	handlePhoneChange = (event) => {
		this.setState({ phone: event.nativeEvent.text });
	};

	handleMessageChange = (event) => {
		this.setState({ message: event.nativeEvent.text });
	};

	handlePhoneNumberChange = (event) => {
		this.setState({ phonenumber: event.nativeEvent.text });
	};

	handleAboutUsChange = (event) => {
		this.setState({ aboutUs: event.nativeEvent.text });
	};

	validateForm = (userDTO) => {
		this.setState({
			cityError: false,
			addressError: false,
			phoneError: false,
			phoneValidateError: false,
			addressNotFoundError: false,
		});

		//const regexPhone = /^([+]?[0-9]{3,6}[-]?[\/]?[0-9]{3,5}[-]?[\/]?[0-9]*)$/;
		//console.log(regexPhone.test(userDTO.phoneNumber));
		if (this.addressInput.current.value === "") {
			this.setState({ addressError: true });
			return false;
		} else if (userDTO.phoneNumber === "") {
			this.setState({ phoneError: true });
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

		if (this.searchKeyword === null) {
			this.setState({ addressError: true });
			return false;
		}


		let stree = this.state.street
		let countr = this.state.country
		let cit = this.state.city
		let long = this.state.longitude
		let lat = this.state.latitute


		let userDTO = {
			address: { stree, countr, cit, lat, long },
			phoneNumber: this.state.phonenumber,
			contactEmail: this.state.email,
			aboutUs: this.state.aboutUs,

		};
		console.log(userDTO);

		if (this.validateForm(userDTO)) {
			if (found === false) {
				this.setState({ addressNotFoundError: true });
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
	};

	handleSend = () => {
		let messageDTO = {
			firstName: this.state.firstName,
			surname: this.state.surname,
			email: this.state.emaill,
			phoneNumber: this.state.phone,
			message: this.state.message
		}

		Axios.post(BASE_URL + "/api/users/sendMessage", messageDTO, {
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
	handleModalClose = () => {
		this.setState({ openModal: false, redirect: true });
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

	hhh = (event) => {
		this.setState({ openModal: true });

	}

	render() {

		return (
			<View>
				<View >

					<Text >
						User information
					</Text>
					<View className="row mt-5">
						<View className="col shadow p-3 bg-white rounded">
							<Text className=" text-center text-uppercase">Contact Information</Text>

							<View className="control-group">
								<View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>

									<TextInput
										readOnly={this.state.hiddenEditInfo}
										className={!this.state.hiddenEditInfo === false ? "form-control-plaintext" : "form-control"}
										placeholder="Contact email"
										type="text"
										onChange={this.handleEmailChange}
										value={this.state.email}
									/>
								</View>

							</View>

							<View className="control-group">
								<View className="form-group">
									<Button
										style={{
											background: "#1977cc",
											marginTop: "15px",

											width: "20%",
										}}
										onPress={this.hhh}
										className="btn btn-primary btn-xl"
										id="sendMessageButton"
										type="button"
										title="Click to change address"
									>

									</Button>
								</View>
								{this.state.addressError && <View className="text-danger" >
									<Text>Address must be entered.</Text>
									</View>}
									{this.state.addressNotFoundError && <View className="text-danger" >
									<Text>Sorry. Address not found. Try different one.</Text>
						
									</View>}
							</View>
							<View className="control-group">
								<View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>

									<TextInput
										readOnly={this.state.hiddenEditInfo}
										className={!this.state.hiddenEditInfo === false ? "form-control-plaintext" : "form-control"}
										placeholder="Phone number"
										type="text"
										onChange={this.handlePhoneNumberChange}
										value={this.state.phonenumber}
									/>
								</View>
								{this.state.phoneError && <View className="text-danger" >
									<Text>Phone number must be entered.</Text>
									</View>}
							</View>

							<View className="control-group">
								<View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>

									<TextInput
										readOnly={this.state.hiddenEditInfo}
										className={!this.state.hiddenEditInfo === false ? "form-control-plaintext" : "form-control"}
										placeholder="About us"
										type="text"
										onChange={this.handleAboutUsChange}
										value={this.state.aboutUs}
									/>
								</View>

							</View>

							<View className="form-group text-center" hidden={this.state.hiddenEditInfo}>
								<Button
									style={{ background: "#1977cc", marginTop: "15px" }}
									onPress={this.handleChangeInfo}
									className="btn btn-primary btn-xl"
									id="sendMessageButton"
									type="button"
									title="Change information"
								>
								</Button>
							</View>

							<View className="form-group" hidden={!this.hasRole("ROLE_ADMIN")}>
								<View className="form-group controls mb-0 pb-2">
									<View className="form-row justify-content-center">
										<View className="form-col" hidden={!this.state.hiddenEditInfo}>
											<Button
												onPress={this.handleEditInfoClick}
												className="btn btn-outline-primary btn-xl"
												id="sendMessageButton"
												type="button"
												title="Edit info"
											>
											</Button>
										</View>


									</View>
								</View>
							</View>

						</View>

					</View>





					<View className="row mt-5" hidden={this.hasRole("ROLE_ADMIN")} >
						<View className="col shadow p-3 bg-white rounded">
							<Text className=" text-center text-uppercase">Contact us</Text>
							
								<View className="control-group">
									<View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>

										<TextInput
											className="form-control"
											placeholder="First name"
											type="text"
											onChange={this.handleFirstNameChange}
											value={this.state.firstName}
										/>
									</View>

								</View>

								<View className="control-group">
									<View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>

										<TextInput
											className="form-control"
											placeholder="Last name"
											type="text"
											onChange={this.handleSurnameChange}
											value={this.state.surname}
										/>
									</View>

								</View>

								<View className="control-group">
									<View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>

										<TextInput
											className="form-control"
											placeholder="Email"
											type="text"
											onChange={this.handleEmaillChange}
											value={this.state.emaill}
										/>
									</View>

								</View>

								<View className="control-group">
									<View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>

										<TextInput
											className="form-control"
											placeholder="Phone number"
											type="text"
											onChange={this.handlePhoneChange}
											value={this.state.phone}
										/>
									</View>

								</View>

								<View className="control-group">
									<View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>

										<TextInput
											className="form-control"
											placeholder="Message"
											type="text"
											onChange={this.handleMessageChange}
											value={this.state.message}
										/>
									</View>

								</View>


								<View className="form-group text-center" >
									<Button
										style={{ background: "#1977cc", marginTop: "15px" }}
										onPress={this.handleSend}
										className="btn btn-primary btn-xl"
										id="sendMessageButton"
										type="button"
										title="Send"
									>
									
									</Button>
								</View>


						
						</View>

					</View>
				</View>
				<Modal isVisible={this.state.openModal}>
							<View style={{flex: 1}}>
							<GooglePlacesAutocomplete
								fetchDetails={true}
								placeholder={this.state.aStreet +', '+ this.state.aCity +', '+ this.state.aCountry } 
								onPress={(data, details = null) => {
									console.log(details.formatted_address,details.getPlace, details.getCountry )
									this.setState({	street: details.formatted_address,
									 city: details.getPlace,
										country: details.getCountry,
										latitute :  details.geometry.location.lat,
										longitude:  details.geometry.location.lng})
								}}
								query={{
									key: 'AIzaSyAsno5WRMrrU_XX-ur8CBRtndECG-0kAfs',
									language: 'en',
								}}
								styles={{
									textInputContainer: {
										backgroundColor: 'grey',
									},
									textInput: {
										height: 38,
										color: '#5d5d5d',
										fontSize: 16,
									}, predefinedPlacesDescription: {
										color: '#1faadb',
									},
								}}

							/>
												<Button
								style={{
									background: "#1977cc",
									marginTop: "15px",

									width: "20%",
								}}
								onPress={this.handleModalClose}
								className="btn btn-primary btn-xl"
								id="sendMessageButton"
								type="button"
								title="Close"
							>

							</Button>
							</View>
						</Modal >


						<Modal isVisible={this.state.openModal2}>
							<Text>You have successfuly registrated</Text>
							<View >
							
												<Button
								style={{
									background: "#1977cc",
									marginTop: "15px",

									width: "20%",
								}}
								onPress={this.handleModalClose}
								className="btn btn-primary btn-xl"
								id="sendMessageButton"
								type="button"
								title="Close"
							>

							</Button>
							</View>
						</Modal >
			</View>

		);
	}
}

export default Contact;
