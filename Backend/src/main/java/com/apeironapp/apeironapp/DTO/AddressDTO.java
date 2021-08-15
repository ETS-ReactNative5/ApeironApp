package com.apeironapp.apeironapp.DTO;

public class AddressDTO {


    private double latitude;


    private double longitude;


    private String city;


    private String street;


    private String country;



    public AddressDTO() {
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }


    public AddressDTO(double latitude, double longitude, String city, String street, String country) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.city = city;
        this.street = street;
        this.country = country;
    }

    @Override
    public String toString() {
        return "AddressDTO{" +
                "latitude=" + latitude +
                ", longitude=" + longitude +
                ", city='" + city + '\'' +
                ", street='" + street + '\'' +
                ", country='" + country + '\'' +
                '}';
    }
}