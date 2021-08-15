package com.apeironapp.apeironapp.DTO;

import java.time.LocalDate;

public class ItemInOrderDTO {

    private Integer itemId;

    private String color;

    private String size;

    private LocalDate date;

    private String quantity;

    public ItemInOrderDTO() {
    }



    public String getColor() {
        return color;
    }

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }
}
