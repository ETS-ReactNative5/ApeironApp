package com.apeironapp.apeironapp.DTO;

import java.util.List;

public class ColorDTO {

    private String color;

    private List<String> colors;

    public ColorDTO() {
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public List<String> getColors() {
        return colors;
    }

    public void setColors(List<String> colors) {
        this.colors = colors;
    }
}
