package com.apeironapp.apeironapp.DTO;


import java.io.File;
import java.util.Collection;
import java.util.List;

public class NewItemDTO {

    private String type;

    private String name;

    private String price;

    private List<QuantityDTO> quantityDTO;

    private List<String> pictures;

    private String gender;

    public List<String> getPictures() {
        return pictures;
    }

    public void setPictures(List<String> pictures) {
        this.pictures = pictures;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public List<QuantityDTO> getQuantityDTO() {
        return quantityDTO;
    }

    public void setQuantityDTO(List<QuantityDTO> quantityDTO) {
        this.quantityDTO = quantityDTO;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }


    @Override
    public String toString() {
        return "NewItemDTO{" +
                "quantityDTO=" + quantityDTO +
                '}';
    }
}
