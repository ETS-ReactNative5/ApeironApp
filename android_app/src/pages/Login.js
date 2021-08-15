import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	TouchableOpacity,
	Button,
	TextInput,
} from 'react-native';
import { BASE_URL } from "../../constants.js";
import Logo from '../components/Logo';
import Form from '../components/Form';
import Axios from "axios";
import AsyncStorage from '@react-native-community/async-storage'
import { Actions } from 'react-native-router-flux';
import { Redirect } from "react-router-dom";
import SyncStorage from 'sync-storage';

class Login extends Component {
	state = {
		errorHeader: "",
		errorMessage: "",
		hiddenErrorAlert: true,
		email: "",
		password: "",
		redirect: false,
		emailError: "none",
		passwordError: "none",
		openPasswordModal: false,
		oldPasswordEmptyError: "none",
		newPasswordEmptyError: "none",
		newPasswordRetypeEmptyError: "none",
		newPasswordRetypeNotSameError: "none",
		errorPasswordHeader: "",
		errorPasswordMessage: "",
		hiddenPasswordErrorAlert: true
	};
	handleEmailChange = (event) => {
		this.setState({ email: event.nativeEvent.text });
	};
	handlePasswordChange = (event) => {
		this.setState({ password: event.nativeEvent.text });
	};

	handleLogin = () => {
		this.setState({ hiddenErrorAlert: true, emailError: "none", passwordError: "none" });

		if (this.validateForm()) {
			let loginDTO = { email: this.state.email, password: this.state.password };
			console.log(loginDTO);
			Axios.post(BASE_URL + "/api/auth/login", loginDTO, { validateStatus: () => true })
				.then((res) => {

					if (res.status === 401) {
						this.setState({ errorHeader: "Bad credentials!", errorMessage: "Wrong username or password.", hiddenErrorAlert: false });
					} else if (res.status === 500) {
						this.setState({ errorHeader: "Bad credentials!", errorMessage: "Wrong username or password.", hiddenErrorAlert: false });
					} else if (res.status === 302) {
						this.setState({ openPasswordModal: true });
					} else {
						console.log(res.data);
						SyncStorage.set("keyToken", res.data.accessToken);
						SyncStorage.set("keyRole", JSON.stringify(res.data.roles));
						SyncStorage.set("expireTime", JSON.stringify(new Date(new Date().getTime() + res.data.expiresIn).getTime()));

						console.log(SyncStorage.get('keyRole'))



						this.props.navigation.navigate('AddItem')
					}
				})
				.catch((err) => {
					console.log("ERRRR" + err);
				});
		}
	};

	validateForm = () => {
		if (this.state.email === "") {
			this.setState({ emailError: "inline" });
			return false;
		} else if (this.state.password === "") {
			this.setState({ passwordError: "inline" });
			return false;
		}

		return true;
	};

	handleCloseAlert = () => {
		this.setState({ hiddenErrorAlert: true });
	};

	handlePasswordModalClose = () => {
		this.setState({ openPasswordModal: false });
	};

	handleCloseAlertPassword = () => {
		this.setState({ hiddenPasswordErrorAlert: true });
	};


	signup() {
		Actions.signup()
	}


	render() {
		const { navigate } = this.props.navigation;
		if (this.state.redirect) return <Redirect push to="/HomePage" />;
		return (

			<View className="container" style={{ marginTop: 10 }}>

				<Text h5 className=" text-center  mb-0 text-uppercase" style={{ marginTop: 2 }}>
					Login
				</Text>

				<View className="row section-design">
					<View className="col-lg-8 mx-auto">


						<View className="control-group">
							<View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
								<TextInput
									placeholder="Email address"
									className="form-control"
									id="name"
									type="text"
									onChange={this.handleEmailChange}
									value={this.state.email}
								/>
							</View>
							<View className="text-danger" style={{ display: this.state.emailError }}>
								<Text>Email must be entered.</Text>
							</View>
						</View>

						<View className="control-group">
							<View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
								<TextInput
									placeholder="Password"
									className="form-control"
									id="password"
									type="password"
									onChange={this.handlePasswordChange}
									value={this.state.password}
								/>
							</View>
							<View className="text-danger" style={{ display: this.state.passwordError }}>
								<Text>	Password must be entered.</Text>
							</View>
						</View>

						<View className="form-group">
							<Button
								style={{ background: "#1977cc", marginTop: "15px", marginLeft: "40%", width: "20%" }}
								onPress={this.handleLogin}
								className="btn btn-primary btn-xl"
								id="sendMessageButton"
								type="button"
								title="	Login"
							>

							</Button>
						</View>

					</View>
				</View>
			</View>




		);
	}
}



const styles = StyleSheet.create({
	container: {
		backgroundColor: '#455a64',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	signupTextCont: {
		flexGrow: 1,
		alignItems: 'flex-end',
		justifyContent: 'center',
		paddingVertical: 16,
		flexDirection: 'row'
	},
	signupText: {
		color: 'rgba(255,255,255,0.6)',
		fontSize: 16
	},
	signupButton: {
		color: '#ffffff',
		fontSize: 16,
		fontWeight: '500'
	}
});


export default Login;