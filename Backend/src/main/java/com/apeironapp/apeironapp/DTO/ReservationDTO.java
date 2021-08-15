package com.apeironapp.apeironapp.DTO;

import java.time.LocalDate;
import java.util.Set;

public class ReservationDTO {

    private Set<String> files;

    private Integer reservationId;

    private String user;

    private String phone;

    private Set<ItemInOrderDTO> itemInOrderDTOSet;

    private Integer itemId;

    private LocalDate dateOfReservation;

    private LocalDate dueDate;

    private String itemName;

    private String itemType;

    private String itemGender;

    private String status;

    private String courier;

    public ReservationDTO() {
    }

    public String getPhone() {
        return phone;
    }

    public String getStatus() {
        return status;
    }

    public String getCourier() {
        return courier;
    }

    public void setCourier(String courier) {
        this.courier = courier;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Set<String> getFiles() {
        return files;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public void setFiles(Set<String> files) {
        this.files = files;
    }

    public String getItemName() {
        return itemName;
    }

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemType() {
        return itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public String getItemGender() {
        return itemGender;
    }

    public void setItemGender(String itemGender) {
        this.itemGender = itemGender;
    }

    public Integer getReservationId() {
        return reservationId;
    }

    public void setReservationId(Integer reservationId) {
        this.reservationId = reservationId;
    }

    public Set<ItemInOrderDTO> getItemInOrderDTOSet() {
        return itemInOrderDTOSet;
    }

    public void setItemInOrderDTOSet(Set<ItemInOrderDTO> itemInOrderDTOSet) {
        this.itemInOrderDTOSet = itemInOrderDTOSet;
    }

    public LocalDate getDateOfReservation() {
        return dateOfReservation;
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
