package com.apeironapp.apeironapp.DTO;

import java.time.LocalDate;

public class QuantityDTO {

    private String color;

    private String size;

    private String quantity;


    public String getColor() {
        return color;
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

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "QuantityDTO{" +
                "color='" + color + '\'' +
                ", size='" + size + '\'' +
                ", quantity='" + quantity + '\'' +
                '}';
    }
}
