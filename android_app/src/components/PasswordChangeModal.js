import React, { Component } from "react";
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	TouchableOpacity,
	TouchableHighlight,
	Button,
	TextInput,
	Image,
	ScrollView,
	Table
} from 'react-native';
import Modal from 'react-native-modal';
class PasswordChangeModal extends Component {
	state = {
		oldPassword: "",
		newPassword: "",
		newPasswordRetype: "",
	};

	handleOldPasswordChange = (event) => {
		this.setState({ oldPassword: event.nativeEvent.text });
	};

	handleNewPasswordChange = (event) => {
		this.setState({ newPassword: event.nativeEvent.text });
	};

	handleNewPasswordRetypeChange = (event) => {
		this.setState({ newPasswordRetype: event.nativeEvent.text });
	};

	render() {
		const { show } = this.props;
		return (
			show &&
			<Modal
			style={{backgroundColor: "white"}}
				transparent={false}
				isVisible={true}

			>
				<ScrollView >
<View  style={styles.container}>
					<View>

						<View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
							<Text>Old password:</Text>
							<TextInput
							style = {styles.inputView}
								placeholder="Old password"
								class="form-control"
								type="password"
								onChange={this.handleOldPasswordChange}
								value={this.state.oldPassword}
							/>
						</View>
						{this.props.oldPasswordEmptyError && <View className="text-danger" >
							<Text>Old password must be entered.</Text>
						</View>}

					</View>
					<View className="control-group">
						<View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
							<Text>New password:</Text>
							<TextInput
								style = {styles.inputView}
								placeholder="New password"
								class="form-control"
								type="password"
								onChange={this.handleNewPasswordChange}
								value={this.state.newPassword}
							/>
						</View>
						{this.props.newPasswordEmptyError && <View className="text-danger" >
							<Text>New password must be entered.</Text>
						</View>}
					</View>
					<View className="control-group">
						<View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
							<Text>Type again new password:</Text>
							<TextInput
								style = {styles.inputView}
								placeholder="Type again new password"
								class="form-control"
								type="password"
								onChange={this.handleNewPasswordRetypeChange}
								value={this.state.newPasswordRetype}
							/>
						</View>
						{this.props.newPasswordRetypeEmptyError && <View className="text-danger">
							<Text>You need to enter again new password.</Text>
						</View>}
						{this.props.newPasswordRetypeNotSameError && <View className="text-danger">
							<Text>Passwords are not the same.</Text>
						</View>}
					</View>
					<View className="form-group text-center">
					<TouchableHighlight
									style={{
										height: 40,
										borderRadius: 80,
										marginTop: 20
									}}>
						<Button
							onPress={() => this.props.changePassword(this.state.oldPassword, this.state.newPassword, this.state.newPasswordRetype)}
							className="btn btn-primary btn-xl"
							id="sendMessageButton"
							type="button"
							title="Change password"
						>

						</Button>
						</TouchableHighlight>
					</View>
					</View>
				</ScrollView>
			</Modal>
		);
	}
}

export default PasswordChangeModal;

const styles = StyleSheet.create({
	container: {
		marginLeft: 30,
		marginRight: 30,
		marginTop: 50
	},
	loginText: {
		padding: 3,
		marginLeft: 15,

		marginTop: 15,
		marginRight: 15
	},
	image: {
		marginLeft: 20,
		marginTop: 30,
		width: 300,
		height: 200,
	},
	inputView: {
		backgroundColor: "#D3D3D3",
		borderRadius: 5,
		height: 45,
		marginTop: 10,
		marginBottom: 10,
		alignItems: "center",
		color: "black"
	},
	text: {

		fontSize: 16,

	},

});
