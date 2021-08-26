
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

import { DataTable } from 'react-native-paper';
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
        this.setState({ newColor: event.nativeEvent.text });
    };


    handleDeleteChange = (e, o) => {
        if (!this.hasRole("ROLE_ADMIN")) {
            this.setState({ redirect: true });
        } else {
            Axios.get(BASE_URL + "/api/admin/deleteColor/" + o.id, { validateStatus: () => true, headers: { Authorization: getAuthHeader() } })
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

        Axios.post(BASE_URL + "/api/admin/newColor", colorDTO, {
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
                    this.props.navigation.navigate('Change')

                }
            })
            .catch((err) => {
                console.log(err);
            });



    };

    render() {


        return (



            <View style={styles.container}>








                <View className="control-group">
                    <View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                        <TextInput
                            style={styles.inputView}
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
                <View style={{marginTop: 30}}>
                <DataTable>



                    {this.state.colors.map((o) => (

                        <DataTable.Row>
                            <DataTable.Cell>{o.color}</DataTable.Cell>
                            <DataTable.Cell ><Button onPress={(e) => this.handleDeleteChange(e, o)} title="DELETE"></Button></DataTable.Cell>

                        </DataTable.Row>



                    ))}
                </DataTable>
                </View>

            </View>


        );
    }


}

export default Change;


const styles = StyleSheet.create({
    container: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 50
    },
    text: {
        fontSize: 16
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
    inputView: {
        backgroundColor: "#D3D3D3",
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
        color: "black"
    },
    google: {
        borderRadius: 30,
        marginBottom: 50
    }
});
