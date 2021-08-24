import React, { Component } from "react";
import Axios from "axios";
import { BASE_URL } from "../../constants.js";
import PharmacyLogo from "../static/naslovna-duks.png";
import { Redirect } from "react-router-dom";
import Order from "../components/Order";
import ModalDialog from "../components/ModalDialog";
import DeliveryInsert from "../components/DeliveryInsert";
import getAuthHeader from "../../GetHeader";

import { DataTable } from 'react-native-paper';
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
import SyncStorage from 'sync-storage';
class AllOrders extends Component {
    state = {
        reservations: [],
        openModal: false,
        openModal2: false,
        openModal3: false,
        couriers: [],
        selectedCourier: "",
        selectedOrder: "",

    };
    handleColorChange = (e) => {

        let u = [];
        this.setState({ selectedCourier: event.nativeEvent.text }, () => {
            console.log(this.state);
        });


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
        if (!this.hasRole("ROLE_USER")) {
            this.setState({ redirect: true });
        } else {
            Axios.get(BASE_URL + "/api/reservations/allUser", { validateStatus: () => true, headers: { Authorization: getAuthHeader() } })
                .then((res) => {
                    this.setState({ reservations: res.data });
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        if (!this.hasRole("ROLE_ADMIN")) {
            this.setState({ redirect: true });
        } else {
            Axios.get(BASE_URL + "/api/reservations/all", { validateStatus: () => true, headers: { Authorization: getAuthHeader() } })
                .then((res) => {
                    this.setState({ reservations: res.data });
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }


        if (!this.hasRole("ROLE_ADMIN")) {
            this.setState({ redirect: true });
        } else {
            Axios.get(BASE_URL + "/api/reservations/couriers", { validateStatus: () => true, headers: { Authorization: getAuthHeader() } })
                .then((res) => {
                    this.setState({ couriers: res.data });
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

    };


    handleModalClose = () => {
        this.setState({ openModal: false, redirect: false });
    };
    handleModalClose2 = () => {
        this.setState({ openModal2: false, redirect: false });

    };
    handleRemove = (e, reservation) => {

        Axios.get(BASE_URL + "/api/reservations/remove/" + reservation.reservationId)
            .then((res) => {
                this.setState({ reservations: res.data });
                console.log(res.data);
                this.setState({ openModal: true });
            })
            .catch((err) => {
                console.log(err);
            });

    };

    handleQR = (e, reservation) => {
        this.setState({ selectedOrder: reservation });
        this.setState({ openModal3: true });



    };

    send = (e, courier, order) => {

        let id = ""
        this.state.couriers.forEach((cour) => {
            if (cour.company === courier) {
                id = cour.id
            }
        })



        Axios.get(BASE_URL + "/api/reservations/generateQR/" + order.reservationId + "/" + id)
            .then((res) => {

                console.log(res.data);
                this.setState({ openModal2: true });
            })
            .catch((err) => {
                console.log(err);
            });

    };

    render() {


        return (

            <View>
                <ScrollView>
                    <Text className=" text-center mb-0 mt-2 text-uppercase">My orders</Text>


                    <DataTable >

                        {this.state.reservations.map((reservation) => (
                            <View>
                                <Image className="img-fluid" source={reservation.files?.[0] ?? PharmacyLogo} />


                                <View>
                                    <Text>STATUS: </Text>
                                    <Text> {reservation.status}</Text>
                                </View>
                                <View>
                                    <Text>Date of reservation: </Text>
                                    <Text> {new Date(reservation.dateOfReservation).toLocaleDateString()}</Text>
                                </View>
                                <View>
                                    <Text>Due date: </Text>
                                    <Text> {new Date(reservation.dueDate).toLocaleDateString()}</Text>
                                </View>
                                <View>
                                    <Text>User: </Text>
                                     <Text>{reservation.user}</Text>
                                </View>
                                <View>
                                    <Text>Contact number: </Text>
                                    <Text> {reservation.phone}</Text>
                                </View>
                                <View>  
                                    <Text>Item type: </Text>
                                    <Text>{reservation.itemType} </Text>
                                    </View>
                                <View>  
                                    <Text>Item gender: </Text>
                                    <Text>{reservation.itemGender}</Text>
                                    </View>
                                <View> 
                                     <Text>Item name: </Text>
                                    <Text>{reservation.itemName}</Text>
                                    </View>


                                <View>
                                    <Text>Reserved color and size: </Text>
                                    {reservation.itemInOrderDTOSet.map((item) => (
                                        <View>  
                                            <Text>Item color: </Text>
                                            <Text>{item.color}    </Text>
                                            <Text>Item size: </Text>
                                            <Text>  {item.size}</Text>

                                            <Text>Item quantity: </Text>
                                            <Text>{item.quantity}</Text>
                                            </View>


                                    ))}

                                </View>

                                <View hidden={!this.hasRole("ROLE_USER")}> 
                                 <Button

                                    onPress={(e) => this.handleRemove(e, reservation)}
                                    className="btn btn-primary btn-xl"
                                    id="sendMessageButton"
                                    type="button"
                                    title="Remove"
                                >
                                </Button></View>

                                <View hidden={!this.hasRole("ROLE_ADMIN") || reservation.status === "SENT"}> 
                                 <Button

                                    onPress={(e) => this.handleRemove(e, reservation)}
                                    className="btn btn-primary btn-xl"
                                    id="sendMessageButton"
                                    type="button"
                                    title="Decline"
                                >
                                </Button></View>

                                <View hidden={!this.hasRole("ROLE_ADMIN") || reservation.status === "SENT"}>  
                                <Button
                                    onPress={(e) => this.handleQR(e, reservation)}
                                    className="btn btn-primary btn-xl"
                                    id="sendMessageButton"
                                    type="button"
                                    title="Order sent"
                                >
                                </Button></View>
                            </View>

                        ))}
                    </DataTable>


                    <ModalDialog
                        show={this.state.openModal}
                        onCloseModal={this.handleModalClose}
                        header="Success"
                        text="You have successfully removed this order."
                    />

                    <ModalDialog
                        show={this.state.openModal2}
                        onCloseModal={this.handleModalClose2}
                        header="Success"
                        text="You have successfully sent this order and made a QR code."
                    />

                    <DeliveryInsert
                        show={this.state.openModal3}
                        onCloseModal={this.handleModalClose3}
                        header="Insert a courier"
                        text="Insert a courier: "
                        couriers={this.state.couriers}
                        selectedCourier={this.state.selectedCourier}
                        handleColorChange={this.handleColorChange}
                        selectedOrder={this.state.selectedOrder}
                        send={this.send}
                    />
                </ScrollView>
            </View>
        );
    }
}

export default AllOrders;

