package com.apeironapp.apeironapp.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("Courier")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Courier extends PersonUser{


    @Column(name = "company", nullable = true)
    private String company;

    @Column(name = "phoneNumber", nullable = true)
    private String phoneNumber;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Address address;

    public Courier(String company, String phoneNumber, Address address) {
        this.company = company;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }

    public Courier() {
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }
}
