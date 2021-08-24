import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	TouchableOpacity,
	Button,
	TextInput,
	Image,
	Link,
	TouchableHighlight
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
		emailError: false,
		passwordError: false,
		openPasswordModal: false,
		oldPasswordEmptyError: false,
		newPasswordEmptyError: false,
		newPasswordRetypeEmptyError: false,
		newPasswordRetypeNotSameError: false,
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
		this.setState({ hiddenErrorAlert: true, emailError: false, passwordError: false });

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



						this.props.navigation.navigate('HomePage')
					}
				})
				.catch((err) => {
					console.log("ERRRR" + err);
				});
		}
	};

	validateForm = () => {
		if (this.state.email === "") {
			this.setState({ emailError: true });
			return false;
		} else if (this.state.password === "") {
			this.setState({ passwordError: true });
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
		if (this.state.redirect) return <Redirect push to="/TShirtsWomen" />;
		return (

			<View  style={styles.container}>



					<Image style={styles.image} source={require("../images/01-APEIRON-LOGO-new.png")} />
							<View style={styles.inputView} >
								<TextInput
									placeholder="Email address"
									className="form-control"
									id="name"
									type="text"
									style={styles.TextInput}
									onChange={this.handleEmailChange}
									value={this.state.email}
								/>
							</View>
							{this.state.emailError && <View className="text-danger" >
								<Text>Email must be entered.</Text>
							</View>}
					

							<View style={styles.inputView}>
								<TextInput
									placeholder="Password"
									className="form-control"
									id="password"
									secureTextEntry={true}
									style={styles.TextInput}
									onChange={this.handlePasswordChange}
									value={this.state.password}
								/>
							</View>
							{this.state.passwordError && <View className="text-danger" >
								<Text>	Password must be entered.</Text>
							</View>}
						

							<TouchableHighlight 
                style ={{
                    height: 40,
                    width:300,
                    borderRadius:80,
                    marginLeft :50,
                    marginRight:50,
                    marginTop :20
                }}>
							<Button
							
								onPress={this.handleLogin}
								color="#ff0000"
								id="sendMessageButton"
								type="button"
								title="	LOGIN"
							>
							</Button>
						</TouchableHighlight>



						<Text>Don't have an account? </Text>
						<Text style={{color: 'blue'}}
      onPress={() => {
		this.props.navigation.navigate('Signup')}}>
  Sign up
</Text>

			</View>




		);
	}
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
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
	},
	image: {
		marginBottom: 40,
	  },
	  inputView: {
		backgroundColor: "#D3D3D3",
		borderRadius: 30,
		width: "70%",
		height: 45,
		marginBottom: 20,
	
		alignItems: "center",
	  },
	  TextInput: {
		height: 50,
		flex: 1,
		padding: 10,
		marginLeft: 20,
	  }, 
	  loginText: {
		height: 50,
		flex: 1,
		padding: 10,
		marginLeft: 20,
	  }, 
	  loginBtn: {
		width: "80%",
		borderRadius: 25,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 40,
		backgroundColor: "#FF0000",
	  },
	
});



export default Login;