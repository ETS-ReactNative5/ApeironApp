import React, { Component } from "react";
import Axios from "axios";
import { BASE_URL } from "../../constants.js";
import PharmacyLogo from "../static/naslovna-duks.png";
import { Redirect } from "react-router-dom";
import Order from "../components/Order";
import ModalDialog from "../components/ModalDialog";
import DeliveryInsert from "../components/DeliveryInsert";
import getAuthHeader from "../../GetHeader";
import Moment from 'moment';
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
        this.setState({ selectedCourier: e }, () => {
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
                    console.log("EEEEEE")
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
                console.log("USPELOOOOOOOOO")
                alert("You have succesfully removed order.")
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

        console.log("flskfksehhke")
        let id = ""
        this.state.couriers.forEach((cour) => {
            if (cour.company === courier) {
                id = cour.id
            }
        })



        Axios.get(BASE_URL + "/api/reservations/generateQR/" + order.reservationId + "/" + id)
            .then((res) => {

                console.log(res.data);
               alert("You have successfully sent an order.")
            })
            .catch((err) => {
                console.log(err);
            });

    };

    render() {

        Moment.locale('en');
        var dt = '2016-05-02';
        return (

            <View style={styles.container}>
                <ScrollView>


                    <DataTable >

                        {this.state.reservations.map((reservation) => (
                            <View key={reservation.user}>
                                <Image style={styles.image} source={{ uri: reservation.files[0] }} />


                                {!this.hasRole("ROLE_USER") &&  <View>
                                    <Text style={{ fontWeight: 'bold' }}>STATUS: </Text>
                                    <Text style={{ backgroundColor: "#E8E8E8", height: 25 }}> {reservation.status}</Text>
                                </View>}
                                <View>
                                    <Text style={{ fontWeight: 'bold' }}>Date of reservation: </Text>
                                    <Text style={{ backgroundColor: "#E8E8E8", height: 25 }}> {Moment(reservation.dateOfReservation, "YYYYMMDD").format('MMMM Do YYYY')} </Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: 'bold' }}>Due date: </Text>
                                    <Text style={{ backgroundColor: "#E8E8E8", height: 25 }}>{Moment(reservation.dueDate, "YYYYMMDD").format('MMMM Do YYYY')} </Text>
                                </View>
                                {!this.hasRole("ROLE_USER") && <View>
                                    <Text style={{ fontWeight: 'bold' }}>User: </Text>
                                     <Text style={{ backgroundColor: "#E8E8E8", height: 25 }}>{reservation.user}</Text>
                                </View>}
                                {!this.hasRole("ROLE_USER") &&  <View>
                                    <Text style={{ fontWeight: 'bold' }}>Contact number: </Text>
                                    <Text style={{ backgroundColor: "#E8E8E8", height: 25 }}> {reservation.phone}</Text>
                                </View>}
                                <View>  
                                    <Text style={{ fontWeight: 'bold' }}>Item type: </Text>
                                    <Text style={{ backgroundColor: "#E8E8E8", height: 25 }}>{reservation.itemType} </Text>
                                    </View>
                                <View>  
                                    <Text style={{ fontWeight: 'bold' }}>Item gender: </Text>
                                    <Text style={{ backgroundColor: "#E8E8E8", height: 25 }}>{reservation.itemGender}</Text>
                                    </View>
                                <View> 
                                     <Text style={{ fontWeight: 'bold' }}>Item name: </Text>
                                    <Text style={{ backgroundColor: "#E8E8E8", height: 25 }}>{reservation.itemName}</Text>
                                    </View>


                                <View>
                                    <Text style={{ fontWeight: 'bold', marginBottom: 25 }}>Reserved color and size: </Text>
                                    {reservation.itemInOrderDTOSet.map((item) => (
                                        <View key={item.color}>  
                                            <Text style={{ fontWeight: 'bold' }}>Item color: </Text>
                                            <Text style={{ backgroundColor: "#E8E8E8", height: 25 }}>{item.color}    </Text>
                                            <Text style={{ fontWeight: 'bold' }}>Item size: </Text>
                                            <Text style={{ backgroundColor: "#E8E8E8", height: 25 }}>  {item.size}</Text>

                                            <Text style={{ fontWeight: 'bold' }}>Item quantity: </Text>
                                            <Text style={{ backgroundColor: "#E8E8E8", height: 25 , marginBottom: 30}}>{item.quantity}</Text>
                                            </View>


                                    ))}

                                </View>

                                {this.hasRole("ROLE_USER") && <View > 
                                <TouchableHighlight
										style={{
											height: 40,
											borderRadius: 80,
											marginTop: 10
										}}>
                                 <Button

                                    onPress={(e) => this.handleRemove(e, reservation)}
                                    id="sendMessageButton"
                                    type="button"
                                    title="Remove"
                                >
                                </Button>
                                </TouchableHighlight>
                                </View>}

                                {this.hasRole("ROLE_ADMIN") && reservation.status != "SENT" && <View > 
                                <TouchableHighlight
										style={{
											height: 40,
											borderRadius: 80,
											marginTop: 10
										}}>
                                 <Button

                                    onPress={(e) => this.handleRemove(e, reservation)}
                                    className="btn btn-primary btn-xl"
                                    id="sendMessageButton"
                                    type="button"
                                    title="Decline"
                                >
                                </Button>
                                </TouchableHighlight>
                                </View>}

                                {this.hasRole("ROLE_ADMIN") && reservation.status != "SENT" && <View >  
                                <TouchableHighlight
										style={{
											height: 40,
											borderRadius: 80,
											marginTop: 10
										}}>
                                <Button
                                    onPress={(e) => this.handleQR(e, reservation)}
                                    className="btn btn-primary btn-xl"
                                    id="sendMessageButton"
                                    type="button"
                                    title="Order sent"
                                >
                                </Button>
                                </TouchableHighlight>
                                </View>}
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

const styles = StyleSheet.create({
    container: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 50
    },
	loginText: {
		flex: 1,
		padding: 3,
		marginLeft: 50,
		fontWeight: "bold"
	},
	image: {
		marginTop: 20,
		marginLeft: 50,
		width: 300,
		height: 200,
	},
	loginBtn: {

		borderRadius: 25,

	},

});

