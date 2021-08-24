import React, { Component } from "react";
import { BASE_URL } from "../../constants.js";
import Axios from "axios";
import PasswordChangeModal from "../components/PasswordChangeModal";
import getAuthHeader from "../../GetHeader";
import SyncStorage from 'sync-storage';
const API_KEY = 'AIzaSyAsno5WRMrrU_XX-ur8CBRtndECG-0kAfs';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Modal from 'react-native-modal';
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	TouchableOpacity,
	Button,
	TextInput,
	Image,
	Table
} from 'react-native';
const mapState = {
	center: [44, 21],
	zoom: 8,
	controls: [],
};

class UserProfilePage extends Component {
	state = {
		id: "",
		email: "",
		password: "",
		firstname: "",
		surname: "",
		address: "",
		phoneNumber: "",
		nameError: false,
		surnameError: false,
		addressError: false,
		phoneError: false,
		phoneValidateError: false,
		oldPasswordEmptyError: false,
		newPasswordEmptyError: false,
		newPasswordRetypeEmptyError: false,
		newPasswordRetypeNotSameError: false,
		openModal: false,
		openPasswordModal: false,
		hiddenEditInfo: true,
		redirect: false,
		hiddenPasswordErrorAlert: true,
		errorPasswordHeader: "",
		errorPasswordMessage: "",
		hiddenSuccessAlert: true,
		successHeader: "",
		successMessage: "",
		hiddenFailAlert: true,
		failHeader: "",
		failMessage: "",
		hiddenAllergenSuccessAlert: true,
		successAllergenHeader: "",
		successAllergenMessage: "",
		hiddenAllergenFailAlert: true,
		failAllergenHeader: "",
		failAllergenMessage: "",
		addressNotFoundError: false,
		aStreet: "",
		aCity: "",
		aCountry: "",
		
	};

	constructor(props) {
		super(props);
		this.addressTextInput = React.createRef();
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

	searchLocation = async (text) => {
		this.setState({ searchKeyword: text });
		Axios
			.request({
				method: 'post',
				url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&TextInput=${this.state.searchKeyword}`,
			})
			.then((response) => {
				console.log(response.data.predictions);
				this.setState({
					searchResults: response.data.predictions,
					isShowingResults: true,
				});
			})
			.catch((e) => {
				console.log(e.response);
			});
	};

	componentDidMount() {
		if (!this.hasRole("ROLE_USER")) {
			this.setState({ redirect: true });
		} else {
			this.addressTextInput = React.createRef();
			Axios.get(BASE_URL + "/api/users", { validateStatus: () => true, headers: { Authorization: getAuthHeader() } })
				.then((res) => {
					if (res.status !== 401) {
						console.log(res.data)
						this.setState({
							id: res.data.Id,
							email: res.data.email,
							firstname: res.data.firstname,
							surname: res.data.surname,
							phonenumber: res.data.phonenumber,
							address: res.data.address,
							aStreet: res.data.address.street,
							aCity:res.data.address.city,
							aCountry: res.data.address.country
						
						});

					} else {
						this.setState({ redirect: true });
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}

	handleEmailChange = (event) => {
		this.setState({ email: event.nativeEvent.text });

	};

	handlePasswordChange = (event) => {
		this.setState({ password: event.nativeEvent.text });
	};

	handleRepeatPasswordChange = (event) => {
		this.setState({ repeatPassword: event.nativeEvent.text });
	};

	handleNameChange = (event) => {
		this.setState({ name: event.nativeEvent.text });
	};

	handleSurnameChange = (event) => {
		this.setState({ surname: event.nativeEvent.text });
	};

	handleAddressChange = (event) => {
		this.setState({ address: event.nativeEvent.text });
	};

	handlePhoneNumberChange = (event) => {
		this.setState({ phoneNumber: event.nativeEvent.text });
	};


	validateForm = (userDTO) => {
		this.setState({
			nameError: false,
			surnameError: false,
			addressError: false,
			addressNotFoundError: false,
			phoneError: false,
			passwordError: false,
			repeatPasswordError: false,
			repeatPasswordSameError: false,
		});

		if (userDTO.firstname === "") {
			this.setState({ nameError: true });
			return false;
		} else if (userDTO.surname === "") {
			this.setState({ surnameError: true });
			return false;
		} else if (userDTO.address === "") {
			this.setState({ addressError: true });
			return false;
		} else if (userDTO.phonenumber === "") {
			this.setState({ phoneError: true });
			return false;
	
		}

	
		return true;
	};



	hhh = (event) => {
		this.setState({ openModal: true });

	}


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
		else {

			let stree = this.state.street
			let countr = this.state.country
			let cit = this.state.city
			let long = this.state.longitude
			let lat = this.state.latitute

				
					
				let userDTO = {
					firstname: this.state.firstname,
					surname: this.state.surname,
					address: { stree, countr, cit, lat, long },
					phonenumber: this.state.phonenumber,
				};
				console.log(userDTO);

				if (this.validateForm(userDTO)) {
				
						console.log(userDTO);
						Axios.put(BASE_URL + "/api/users/update", userDTO, {
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
			


	handlePasswordModal = () => {
		this.setState({ hiddenEditInfo: true, openPasswordModal: true });
	};



	changePassword = (oldPassword, newPassword, newPasswordRetype) => {
		console.log(oldPassword, newPassword, newPasswordRetype);

		this.setState({
			hiddenPasswordErrorAlert: true,
			errorPasswordHeader: "",
			errorPasswordMessage: "",
			hiddenEditInfo: true,
			oldPasswordEmptyError: false,
			newPasswordEmptyError: false,
			newPasswordRetypeEmptyError: false,
			newPasswordRetypeNotSameError: false,
			hiddenSuccessAlert: true,
			successHeader: "",
			successMessage: "",
		});

		if (oldPassword === "") {
			this.setState({ oldPasswordEmptyError: true });
		} else if (newPassword === "") {
			this.setState({ newPasswordEmptyError: true });
		} else if (newPasswordRetype === "") {
			this.setState({ newPasswordRetypeEmptyError: true });
		} else if (newPasswordRetype !== newPassword) {
			this.setState({ newPasswordRetypeNotSameError: true });
		} else {
			let passwordChangeDTO = { oldPassword, newPassword };
			Axios.post(BASE_URL + "/api/users/changePassword", passwordChangeDTO, {
				validateStatus: () => true,
				headers: { Authorization: getAuthHeader() },
			})
				.then((res) => {
					if (res.status === 403) {
						this.setState({
							hiddenPasswordErrorAlert: false,
							errorPasswordHeader: "Bad credentials",
							errorPasswordMessage: "You entered wrong password.",
						});
					} else if (res.status === 400) {
						this.setState({
							hiddenPasswordErrorAlert: false,
							errorPasswordHeader: "Invalid new password",
							errorPasswordMessage: "Invalid new password.",
						});
					} else if (res.status === 500) {
						this.setState({
							hiddenPasswordErrorAlert: false,
							errorPasswordHeader: "Internal server error",
							errorPasswordMessage: "Server error.",
						});
					} else if (res.status === 204) {
						this.setState({
							hiddenSuccessAlert: false,
							successHeader: "Success",
							successMessage: "You successfully changed your password.",
							openPasswordModal: false,
						});
					}
					console.log(res);
				})
				.catch((err) => {
					console.log(err);
				});
		}
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


	render() {
	

		return (

				<View>
		
					<Text className=" text-center  mb-0 text-uppercase">
						User information
					</Text>
					<View className="row mt-5">
						<View className="col shadow p-3 bg-white rounded">
							<Text className=" text-center text-uppercase">Personal Information</Text>
						
								<View className="control-group">
									<View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
										
										<TextInput
											readOnly
											placeholder="Email address"
											className="form-control-plaintext"
											id="name"
											type="text"
											onChange={this.handleEmailChange}
											value={this.state.email}
										/>
									</View>
								</View>
								<View className="control-group">
									<View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
									
										<TextInput
											readOnly={this.state.hiddenEditInfo}
											className={!this.state.hiddenEditInfo === false ? "form-control-plaintext" : "form-control"}
											placeholder="Name"
											type="text"
											onChange={this.handleNameChange}
											value={this.state.firstname}
										/>
									</View>
									{this.state.nameError && <View className="text-danger" >
								<Text>Name must be entered.</Text>
							</View>}
								</View>
								<View className="control-group">
									<View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
										
										<TextInput
											readOnly={this.state.hiddenEditInfo}
											className={!this.state.hiddenEditInfo === false ? "form-control-plaintext" : "form-control"}
											placeholder="Surname"
											type="text"
											onChange={this.handleSurnameChange}
											value={this.state.surname}
										/>
									</View>
									{this.state.surnameError && <View className="text-danger" >
										<Text>Surname must be entered.</Text>
									</View>}
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

								<View className="form-group">
									<View className="form-group controls mb-0 pb-2">
										<View className="form-row justify-content-center">
											<View className="form-col" hidden={!this.state.hiddenEditInfo}>
												<Button
													onPress={this.handleEditInfoClick}
													className="btn btn-outline-primary btn-xl"
													id="sendMessageButton"
													type="button"
													title= "Edit Info"
												>
												</Button>
											</View>

											<View className="form-col ml-3">
												<Button
													onPress={this.handlePasswordModal}
													className="btn btn-outline-primary btn-xl"
													id="sendMessageButton"
													type="button"
													title="Change Password"
												>
												</Button>
											</View>
										</View>
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
					<PasswordChangeModal
					show={this.state.openPasswordModal}
					handleCloseAlertPassword={this.handleCloseAlertPassword}
					hiddenPasswordErrorAlert={this.state.hiddenPasswordErrorAlert}
					errorPasswordHeader={this.state.errorPasswordHeader}
					errorPasswordMessage={this.state.errorPasswordMessage}
					oldPasswordEmptyError={this.state.oldPasswordEmptyError}
					newPasswordEmptyError={this.state.newPasswordEmptyError}
					newPasswordRetypeEmptyError={this.state.newPasswordRetypeEmptyError}
					newPasswordRetypeNotSameError={this.state.newPasswordRetypeNotSameError}
					changePassword={this.changePassword}
					onCloseModal={this.handlePasswordModalClose}
					header="Change password"
				/>
				</View>
			
				
		);
	}
}

export default UserProfilePage;
