package com.apeironapp.apeironapp.DTO;

import com.apeironapp.apeironapp.Model.Item;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

public class NewOrderDTO {

    private Set<ItemInOrderDTO> items = new HashSet<ItemInOrderDTO>();

    private LocalDate dateOfReservation;

    private LocalDate dueDate;

    private Integer registeredUserId;



    public NewOrderDTO() {
    }



    public Set<ItemInOrderDTO> getItems() {
        return items;
    }

    public void setItems(Set<ItemInOrderDTO> items) {
        this.items = items;
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

    public Integer getRegisteredUserId() {
        return registeredUserId;
    }

    public void setRegisteredUserId(Integer registeredUserId) {
        this.registeredUserId = registeredUserId;
    }


}

