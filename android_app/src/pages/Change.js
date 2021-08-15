
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';
import Axios from "axios";
import { BASE_URL } from "../../constants.js";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Redirect } from "react-router-dom";
import getAuthHeader from "../../GetHeader";
import SyncStorage from 'sync-storage';

class Change extends Component {
    state = {
        colors: [],
        newColor: "",
    };



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
        if (!this.hasRole("ROLE_ADMIN")) {
            this.setState({ redirect: true });
        } else {
            Axios.get(BASE_URL + "/api/admin/colors", { validateStatus: () => true, headers: { Authorization: getAuthHeader() } })
                .then((res) => {
                    if (res.status !== 401) {
                        console.log(res.data)
                        this.setState({
                            colors: res.data,
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

    handleColorChange = (event) => {
        this.setState({ newColor:event.nativeEvent.text });
    };


    handleDeleteChange = (e, o) => {
        if (!this.hasRole("ROLE_ADMIN")) {
            this.setState({ redirect: true });
        } else {
            Axios.get(BASE_URL + "/api/admin/deleteColor/"+ o.id, { validateStatus: () => true, headers: { Authorization: getAuthHeader() } })
                .then((res) => {
                    if (res.status !== 401) {
                        console.log(res.data)
                        window.location.reload();
                    } else {
                        this.setState({ redirect: true });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }


    };
    handleAdd = () => {
        let colorDTO = {
            color: this.state.newColor,
        }
        console.log(this.state.newColor);

        Axios.post(BASE_URL + "/api/admin/newColor",colorDTO, {
            validateStatus: () => true,
            headers: { Authorization: getAuthHeader() },
        })
            .then((res) => {
                window.location.reload();
                if (res.status === 400) {
                    this.setState({ hiddenFailAlert: false, failHeader: "Bad request", failMessage: "Invalid argument." });
                } else if (res.status === 500) {
                    this.setState({ hiddenFailAlert: false, failHeader: "Internal server error", failMessage: "Server error." });
                } else if (res.status === 204) {
                    console.log("Success");
                   
                }
            })
            .catch((err) => {
                console.log(err);
            });



    };

    render() {
        if (this.state.redirect) return <Redirect push to="/unauthorized" />;
 
        return (
          
               

                <View className="container" style={{ marginTop: 2 }}>

                    <Text h5 className=" text-center  mb-0 text-uppercase" style={{ marginTop: 2 }}>
                        Add new color
					</Text>

                    <View >
                    {this.state.colors.map((o) => (
                      <View key={o.id}>
                      <Text key={o.id}> {o.color}  <Button onPress={(e) => this.handleDeleteChange(e, o)} title="DELETE"></Button></Text>
                     
                      </View>
                    ))}
                           
                    </View>


                    <View className="row section-design">
                        <View className="col-lg-8 mx-auto">
                           
                          
                                <View className="control-group">
                                    <View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                                        <TextInput
                                            placeholder="Insert new color"
                                            className="form-control"
                                            id="name"
                                            type="text"
                                            onChange={this.handleColorChange}
                                            value={this.state.newColor}
                                        />
                                    </View>

                                </View>

                                <View className="form-group">
                                    <Button
                                        style={{ background: "#1977cc", marginTop: 2, marginLeft: 4, width: "20%" }}
                                        onPress={this.handleAdd}
                                        className="btn btn-primary btn-xl"
                                        id="sendMessageButton"
                                        type="button"
                                        title="Add color"
                                    >
									</Button>
                                </View>
                          
                        </View>
                    </View>
                </View>

            
        );
    }


}

export default Change;


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});
