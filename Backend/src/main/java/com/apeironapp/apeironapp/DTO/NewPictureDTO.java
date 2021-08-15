package com.apeironapp.apeironapp.DTO;

import com.apeironapp.apeironapp.Model.Item;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

public class NewPictureDTO {

    private String name;

    private byte[] picByte;

    private Integer itemId;

    public NewPictureDTO() {
    }

    public NewPictureDTO(String name, byte[] picByte, Integer itemId) {
        this.name = name;
        this.picByte = picByte;
        this.itemId = itemId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getPicByte() {
        return picByte;
    }

    public void setPicByte(byte[] picByte) {
        this.picByte = picByte;
    }

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }
}
