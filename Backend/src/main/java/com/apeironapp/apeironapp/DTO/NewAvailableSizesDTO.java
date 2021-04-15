package com.apeironapp.apeironapp.DTO;


public class NewAvailableSizesDTO {

    private String size;

    private Integer quantity;

    private Integer availableColorsId;

    public NewAvailableSizesDTO() {
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getAvailableColorsId() {
        return availableColorsId;
    }

    public void setAvailableColorsId(Integer availableColorsId) {
        this.availableColorsId = availableColorsId;
    }

    @Override
    public String toString() {
        return "NewAvailableSizesDTO{" +
                "size='" + size + '\'' +
                ", quantity=" + quantity +
                ", availableColorsId=" + availableColorsId +
                '}';
    }
}
