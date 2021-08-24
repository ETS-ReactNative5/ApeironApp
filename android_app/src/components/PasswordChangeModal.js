import React, { Component } from "react";
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
		const {show} = this.props;
		return (
			show && 
			<Modal
		 		transparent={false}
				show={true}
				size="lg"
				dialogClassName="modal-80w-80h"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				onHide={this.props.onCloseModal}
			>
				
					
					<View className="control-group">
						<View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
							<Text>Old password:</Text>
							<TextInput
								placeholder="Old password"
								class="form-control"
								type="password"
								onChange={this.handleOldPasswordChange}
								value={this.state.oldPassword}
							/>
						</View>
						<View className="text-danger" style={{ display: this.props.oldPasswordEmptyError }}>
							<Text>Old password must be entered.</Text>
						</View>
						<View className="text-danger" style={{ display: "none" }}>
						<Text>Old password is not valid.</Text>
						</View>
					</View>
					<View className="control-group">
						<View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
							<Text>New password:</Text>
							<TextInput
								placeholder="New password"
								class="form-control"
								type="password"
								onChange={this.handleNewPasswordChange}
								value={this.state.newPassword}
							/>
						</View>
						<View className="text-danger" style={{ display: this.props.newPasswordEmptyError }}>
							<Text>New password must be entered.</Text>
						</View>
					</View>
					<View className="control-group">
						<View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
							<Text>Type again new password:</Text>
							<TextInput
								placeholder="Type again new password"
								class="form-control"
								type="password"
								onChange={this.handleNewPasswordRetypeChange}
								value={this.state.newPasswordRetype}
							/>
						</View>
						<View className="text-danger" style={{ display: this.props.newPasswordRetypeEmptyError }}>
							<Text>You need to enter again new password.</Text>
						</View>
						<View className="text-danger" style={{ display: this.props.newPasswordRetypeNotSameError }}>
						<Text>Passwords are not the same.</Text>
						</View>
					</View>
					<View className="form-group text-center">
						<Button
							style={{ background: "#1977cc", marginTop: "15px" }}
							onPress={() => this.props.changePassword(this.state.oldPassword, this.state.newPassword, this.state.newPasswordRetype)}
							className="btn btn-primary btn-xl"
							id="sendMessageButton"
							type="button"
							title="Change password"
						>
							
						</Button>
					</View>
				
			</Modal>
		);
	}
}

export default PasswordChangeModal;
