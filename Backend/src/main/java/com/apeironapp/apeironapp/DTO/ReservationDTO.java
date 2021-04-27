package com.apeironapp.apeironapp.DTO;

import java.time.LocalDate;
import java.util.Set;

public class ReservationDTO {

    private Integer reservationId;

    private Set<ItemInOrderDTO> itemInOrderDTOSet;

    private Integer itemId;

    private LocalDate dateOfReservation;

    private LocalDate dueDate;

    private String itemName;

    private String itemType;

    private String itemGender;

    public ReservationDTO() {
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
