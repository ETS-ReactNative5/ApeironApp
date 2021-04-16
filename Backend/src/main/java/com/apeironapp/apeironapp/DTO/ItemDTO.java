package com.apeironapp.apeironapp.DTO;

import java.util.List;

public class ItemDTO {

    private Integer id;

    private String type;

    private String name;

    private String price;

    private List<NewAvailableColorsDTO> colors;


    private String gender;

    public ItemDTO() {
    }

    public String getType() {
        return type;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public List<NewAvailableColorsDTO> getColors() {
        return colors;
    }

    public void setColors(List<NewAvailableColorsDTO> colors) {
        this.colors = colors;
    }



    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }


    @Override
    public String toString() {
        return "ItemDTO{" +
                "type='" + type + '\'' +
                ", name='" + name + '\'' +
                ", price='" + price + '\'' +
                ", colors=" + colors +

                ", gender='" + gender + '\'' +
                '}';
    }
}
