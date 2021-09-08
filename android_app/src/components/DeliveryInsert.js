import React, { Component } from "react";
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
  Image,
  ViewComponent,
  ScrollView
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
class ModalDialog extends Component {


  render() {
    const { show } = this.props;
    return (
      show &&
      <Modal
        isVisible={true}
      >

<View style={{ backgroundColor: "white" }}>



          <Picker
            class="btn btn-secondary dropdown-toggle"
            aria-haspopup="true"
            aria-expanded="false"
            onValueChange={(e) => this.props.handleColorChange(e)}
            selectedValue={this.props.selectedCourier}
          >
            <Picker.Item  value="Choose a courier" label="Choose a courier">

            </Picker.Item>
            {this.props.couriers.map((chain) => (
              <Picker.Item key={chain.id} value={chain.company} label={chain.company}>

              </Picker.Item>
            ))}
          </Picker>
        </View>


        <View> 
           <Button
          onPress={(e) => this.props.send(e, this.props.selectedCourier, this.props.selectedOrder)}
          className="btn btn-primary btn-xl"
          id="sendMessageButton"
          type="button"
          title="Choose"
        >
        </Button>
        </View>

      </Modal>
    );
  }
}

export default ModalDialog;
