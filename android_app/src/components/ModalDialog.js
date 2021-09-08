import React, { Component } from "react";
import { } from "react-bootstrap";
import Modal from 'react-native-modal';
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	TouchableOpacity,
	TextInput,
	Button,
	FlatList,
} from 'react-native';
class ModalDialog extends Component {

  constructor(){
    super(); 
  }    
  
  render() {
    const { show } = this.props;
    
    return (
      
      show &&
      <View>
      <Modal  show={true}>
      <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.header}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{this.props.subheader}</h4>
          <p>{this.props.text}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onCloseModal} href={this.props.href}>
            Close
          </Button>
        </Modal.Footer>
    </Modal >

    </View>
    
    );
  }
}

export default ModalDialog;
