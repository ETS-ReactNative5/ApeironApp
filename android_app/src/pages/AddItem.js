import React, { Component } from "react";
import { BASE_URL } from "../../constants.js";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import getAuthHeader from "../../GetHeader";
import SyncStorage from 'sync-storage';
import { Modal } from "react-bootstrap";
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    Button,
    TextInput,
    Image,
    ScrollView
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'
class RegisterPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            resourcePath: {},
            filePath: "",
            fileData: "",
            fileUri: "",
            pictures: [],
            types: ["Hoodie", "T-Shirt", "Hat"],
            colors: [],
            sizes: ["XS", "S", "M", "L", "XL"],
            showedTypes: ["Hoodie", "T-Shirt", "Hat"],
            errorHeader: "",
            errorMessage: "",
            hiddenErrorAlert: true,
            name: "",
            price: "",
            nameError: "none",
            typeError: "none",
            priceError: "none",
            selectedType: "",
            openModal: false,
            quantity: [],
            size: [],
            q: "",
            s: "",
            gender: "",
            hat: false,
            selectedColor: "",
            selectedSize: "",
            quantity: [],
            orders: [],
            photo: null,


        };
        this.onDrop = this.onDrop.bind(this);

    }

    hasRole = (reqRole) => {
        let roles = JSON.parse(SyncStorage.get("keyRole"));

        if (roles === null) return false;

        if (reqRole === "*") return true;

        for (let role of roles) {
            if (role === reqRole) return true;
        }
        return false;
    };

    handleChoosePhoto = () => {

        const options = {
            noData: true,
        }
        launchImageLibrary(options, response => {



            this.setState({ photo: response })

        })
    }



    imageGalleryLaunch = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options, (res) => {
            console.log('Response = ', res);

            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                const source = { uri: res.uri };
                console.log('response', res.assets[0].uri);
                console.log('PICTUREEEEEEEEEEEE', res);
                console.log('PICTUREEEEEEEEEEEE', res.data);
                this.setState({
                    filePath: res.assets[0].uri,
                    fileData: res,
                    fileUri: res.uri
                });
            }
        });
    }
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
    onDrop(picture) {

        this.setState({
            pictures: [],
        });
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });

        let pomoc = picture.length;
        if (pomoc === 0) {
            this.setState({
                noPicture: true,
            });
            this.setState({
                showImageModal: false,
            });
        }
        else {
            this.setState({
                noPicture: false,
            });
            this.setState({
                showImageModal: true,
            });

        }


    }

    test(pic) {

        var photo = {
            uri: this.state.filePath,
            type: 'image/jpeg',
            name: 'photo.jpg',
          };
          
          var form = new FormData();
          form.append("file", photo);
          
        const options = {
            method: "POST",
            body: form

        };
        fetch(BASE_URL + "/api/items/upload", options);
    }

    handleRemoveChange = (e, c) => {

        let u = this.state.orders;
        u.pop(c);
        this.setState({ orders: u })
    }

    handleAddChange = () => {
        let u = this.state.orders;
        let reservation = {
            color: this.state.selectedColor,
            size: this.state.selectedSize,
            quantity: this.state.quantity,
        };

        u.push(reservation);
        this.setState({ orders: u });

        let t = [];
        this.state.orders.forEach((a) => {
            let reservation = {
                color: a.color,
                size: a.size,
                quantity: a.quantity,
            };
            t.push(reservation)
        });
        this.state.orders = [];
        this.setState({ orders: t });


    }



    handleQuantityChange = (event) => {
        this.setState({ quantity: event.nativeEvent.text });
    };
    handleColorChange = (e) => {

        let u = [];
        this.setState({ selectedColor: e }, () => {
            console.log(this.state);
        });

        this.changeEndEntityChain(e);
    };

    changeEndEntityChain = (e) => {
        if (e === "") {
            this.setState({ showedColors: this.state.colors });
        } else {
            let u = [];
            this.state.colors.forEach((chain) => {
                if (chain.color !== e) {
                    u.push(chain);
                }
            });

            this.setState({ showedColors: u });
        }
    };

    handleSizeChange = (e) => {
        this.setState({ selectedSize: e }, () => {
            console.log(this.state);
        });
        this.changeEndEntitySizeChain(e);
    };

    changeEndEntitySizeChain = (e) => {
        if (e === "") {
            this.setState({ showedSizes: this.state.sizes });
        } else {
            let u = [];
            this.state.sizes.forEach((chain) => {
                if (chain.size !== e) {
                    u.push(chain);
                }
            });

            this.setState({ showedSizes: u });
        }
    };


    toggleCertificatePurposeVisibility = () => {
        this.setState({ showedPurposes: !this.state.showedPurposes });
    };


    handleNameChange = (event) => {
        this.setState({ name: event.nativeEvent.text });
    };

    handlePriceChange = (event) => {
        this.setState({ price: event.nativeEvent.text });
    };


    validateForm = (itemDTO) => {
        this.setState({
            nameError: "none",
            priceError: "none",
            typeError: "none"
        });

        if (itemDTO.name === "") {
            this.setState({ nameError: "initial" });
            return false;
        } else if (itemDTO.price === "") {
            this.setState({ priceError: "initial" });
            return false;
        } else if (itemDTO.type === "") {
            this.setState({ typeError: "initial" });
            return false;
        }
        return true;
    };

    handleTypeChange = (e) => {
        if (e === "") {
            this.setState({ selectedType: "", showedTypes: this.state.types });
        } else {
            if (e === "Hat") {
                this.setState({ hat: true });
            } else {
                this.setState({ hat: false });
            }
            this.state.types.forEach((chain) => {
                if (chain === e) {
                    console.log(chain);
                    console.log(chain);
                    this.changeTypeUsers(chain);
                    this.setState({ selectedType: chain }, () => {
                        console.log(this.state);
                    });
                }
            });
        }
    };

    changeTypeUsers = (e) => {
        let u = [];

        this.state.types.forEach((user) => {
            if (user !== e) {
                u.push(user);
            }
        });

        this.setState({ type: u });
    };
    handleSignUp = () => {


        let itemDTO = "";
        let pics = []
        pics.push(this.state.filePath)

        this.state.pictures.forEach((p) => {
            console.log(p.name)
            pics.push(p.name)

        });
        if (this.state.hat) {
            itemDTO = {
                type: this.state.selectedType,
                price: this.state.price,
                name: this.state.name,
                quantityDTO: this.state.orders,
                gender: "Hat",
                pictures: pics
            }
        } else {
            itemDTO = {
                type: this.state.selectedType,
                price: this.state.price,
                name: this.state.name,
                quantityDTO: this.state.orders,
                gender: this.state.gender,
                pictures: pics
            };
        }
        console.log(itemDTO);

        if (this.validateForm(itemDTO)) {

            console.log(this.state.pictures)
            this.state.pictures.forEach((pic) => {
                this.test(pic);
            });
            this.test(this.state.fileData);
            this.setState({
                pictures: []

            });

            console.log(itemDTO);
            if (!this.hasRole("ROLE_ADMIN")) {
                this.setState({ redirect: true });
            } else {
                Axios.post(BASE_URL + "/api/items/add", itemDTO, this.state.pictures, { validateStatus: () => true })
                    .then((res) => {
                        if (res.status === 409) {
                            this.setState({
                                errorHeader: "Resource conflict!",
                                errorMessage: "Email already exist.",
                                hiddenErrorAlert: false,
                            });
                        } else if (res.status === 500) {
                            this.setState({ errorHeader: "Internal server error!", errorMessage: "Server error.", hiddenErrorAlert: false });
                        } else {
                            console.log("Success");
                            this.setState({ openModal: true });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }



    };

    handleCloseAlert = () => {
        this.setState({ hiddenErrorAlert: true });
    };
    handleModalClose = () => {
        this.setState({ openModal: false, redirect: false });
    };

    handleGenderChange(event) {

        this.setState({ gender: event });
    }

    render() {
        if (this.state.redirect) return <Redirect push to="/" />;
        const { photo } = this.state
        return (
            <ScrollView>
                <View className="container" style={{ marginTop: 8 }}>

                    <Text h5 className=" text-center  mb-0 text-uppercase" style={{ marginTop: 2 }}>
                        Add new item
                    </Text>

                    <View className="row section-design">


                        <View className="col-lg-8 mx-auto">
                            <Image
                                source={{ uri: this.state.filePath }}
                                style={{ width: 200, height: 200 }}
                            />
                            <TouchableOpacity onPress={this.imageGalleryLaunch}  >
                                <Text >Choose image</Text>
                            </TouchableOpacity>

                            <View className="control-group">

                                <View>
                                    <Picker
                                        class="btn btn-secondary dropdown-toggle"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        onValueChange={(e) => this.handleTypeChange(e)}
                                        selectedValue={this.state.selectedType}
                                    >
                                        <Picker.Item style={{ marginLeft: "12rem" }} label=" Choose an item type" value="Choose an item type">

                                        </Picker.Item>
                                        {this.state.showedTypes.map((chain) => (
                                            <Picker.Item key={chain} label={chain} value={chain}>

                                            </Picker.Item>
                                        ))}
                                    </Picker>
                                </View>


                            </View>
                            <View className="control-group">
                                <View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                                    <Text>Insert item name:</Text>
                                    <TextInput
                                        placeholder="Name"
                                        class="form-control"
                                        type="text"
                                        id="name"
                                        onChange={this.handleNameChange}
                                        value={this.state.name}
                                    />
                                </View>
                                <View className="text-danger" style={{ display: this.state.nameError }}>
                                    <Text>Item name must be entered.</Text>
                                </View>
                            </View>





                            <View >
                                <RadioButton.Group
                                    onValueChange={value => this.setState({ value })}
                                    value={this.state.value}
                                >
                                    <View>
                                        <RadioButton value='Male' label='Male' onPress={(e) => this.handleGenderChange('Male')} /><Text>Male</Text>
                                    </View>
                                    <View>
                                        <RadioButton value='Female' label='Female' onPress={(e) => this.handleGenderChange('Female')} /><Text>Female</Text>
                                    </View>
                                </RadioButton.Group>

                            </View>









                            <View className="control-group">
                                <View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                                    <Text>Insert item price:</Text>
                                    <TextInput
                                        placeholder="Price"
                                        class="form-control"
                                        type="text"
                                        id="surname"
                                        onChange={this.handlePriceChange}
                                        value={this.state.price}
                                    />
                                </View>
                                <View className="text-danger" style={{ display: this.state.priceError }}>
                                    <Text>Price must be entered.</Text>
                                </View>
                            </View>

                            <View>
                                <Picker
                                    class="btn btn-secondary dropdown-toggle"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    onValueChange={(e) => this.handleColorChange(e)}
                                    selectedValue={this.state.selectedColor}
                                >
                                    <Picker.Item style={{ marginLeft: 2 }} label=" Choose the color">

                                    </Picker.Item>
                                    {this.state.colors.map((chain) => (

                                        <Picker.Item key={chain.id} label={chain.color} value={chain.color}>

                                        </Picker.Item>
                                    ))}
                                </Picker>
                            </View>
                            <View>
                                <Picker
                                    class="btn btn-secondary dropdown-toggle"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    onValueChange={(e) => this.handleSizeChange(e)}
                                    selectedValue={this.state.selectedSize}


                                >
                                    <Picker.Item style={{ marginLeft: "12rem" }} label="Choose the size">

                                    </Picker.Item>
                                    {this.state.sizes.map((a) => (

                                        <Picker.Item key={a} label={a} value={a}>

                                        </Picker.Item>

                                    ))}
                                </Picker>
                            </View>

                            <View className="control-group">
                                <View className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
                                    <Text>Insert quantity of item:</Text>
                                    <TextInput
                                        placeholder="Quantity"
                                        class="form-control"
                                        type="text"
                                        id="name"
                                        onChange={this.handleQuantityChange}
                                        value={this.state.quantity}
                                    />
                                </View>

                            </View>


                            <View>
                                <Button className="mt-3" onPress={this.handleAddChange} title="Add to chart">

                                </Button>
                            </View>

                            <View style={{ marginTop: 2 }}>
                                <Text>Color Size Quantity Remove </Text>
                                {this.state.orders.map((c) => (
                                    <View>
                                        <Text>{c.color} {c.size} {c.quantity}  <Button className="mt-3" onPress={(e) => this.handleRemoveChange(e, c)} title=" Remove">

                                        </Button> </Text>

                                    </View>
                                ))}

                            </View>



                            <View className="form-group">
                                <Button
                                    style={{
                                        background: "#1977cc",
                                        marginLeft: "40%",
                                        width: 2,
                                    }}
                                    onPress={this.handleSignUp}
                                    className="btn btn-primary btn-xl"
                                    id="sendMessageButton"
                                    type="button"
                                    title="Add item"
                                >

                                </Button>
                            </View>



                        </View>
                    </View>
                </View>

            </ScrollView>


        );
    }
}
export default RegisterPage;


