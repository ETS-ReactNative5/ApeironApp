package com.apeironapp.apeironapp.DTO;


import java.util.List;

public class NewAvailableColorsDTO {

    private String color;

    private Integer quantity;

    private Integer itemId;

    private List<NewAvailableSizesDTO> sizes;

    public NewAvailableColorsDTO() {
    }

    public Integer getItemId() {
        return itemId;
    }

    public List<NewAvailableSizesDTO> getSizes() {
        return sizes;
    }

    public void setSizes(List<NewAvailableSizesDTO> sizes) {
        this.sizes = sizes;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "NewAvailableColorsDTO{" +
                "color='" + color + '\'' +
                ", quantity=" + quantity +
                ", itemId=" + itemId +
                '}';
    }
}
