package com.apeironapp.apeironapp.Model;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import javax.persistence.Entity;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Entity

@Table(name="order_table")
public class Order {

    @Id
    @GeneratedValue
    @Column(name="id", unique=true, nullable=false)
    private Integer id;

    @JsonBackReference
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinColumn(name = "registeredUser_id", referencedColumnName = "id", nullable = true, unique = false)
    private RegisteredUser registeredUser;

    @ManyToMany
    @JsonIgnore
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JoinTable(name = "items_in_order", joinColumns = @JoinColumn(name = "item_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "order_id", referencedColumnName = "id"))
    private Set<ItemInOrder> items = new HashSet<ItemInOrder>();

    @Column(name = "dueDate", nullable = true)
    private LocalDate dueDate;

    @Column(name = "dateOfReservation", nullable = true)
    private LocalDate dateOfReservation;

    @Column(name = "itemId", nullable = true)
    private Integer itemId;

    @Column(name = "qr", nullable = true)
    private String qr;

    @Column(name = "status", nullable = true)
    private String status;

    @JsonBackReference
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinColumn(name = "courier_id", referencedColumnName = "id", nullable = true, unique = false)
    private Courier courier;

    public Order() {
    }

    public String getStatus() {
        return status;
    }

    public Courier getCourier() {
        return courier;
    }

    public void setCourier(Courier courier) {
        this.courier = courier;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getQr() {
        return qr;
    }

    public void setQr(String qr) {
        this.qr = qr;
    }

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public RegisteredUser getRegisteredUser() {
        return registeredUser;
    }

    public void setRegisteredUser(RegisteredUser registeredUser) {
        this.registeredUser = registeredUser;
    }


    public LocalDate getDateOfReservation() {
        return dateOfReservation;
    }

    public Set<ItemInOrder> getItems() {
        return items;
    }

    public void setItems(Set<ItemInOrder> items) {
        this.items = items;
    }

    public void setDateOfReservation(LocalDate dateOfReservation) {
        this.dateOfReservation = dateOfReservation;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }



}
