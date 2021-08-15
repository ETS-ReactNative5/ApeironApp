package com.apeironapp.apeironapp.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import javax.persistence.Entity;
import java.util.HashSet;
import java.util.Set;

@Entity

@Table(name="Size_table")
public class AvailableSize {

    @Id
    @GeneratedValue
    @Column(name="id", unique=true, nullable=false)
    private Integer id;

    @Column(name = "size", nullable = true)
    private String size;

    @Column(name = "quantity", nullable = true)
    private Integer quantity;

    @JsonBackReference
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinColumn(name = "availableColors_id", referencedColumnName = "id", nullable = false, unique = false)
    private AvailableColors availableColors;

    public AvailableSize() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public AvailableColors getAvailableColors() {
        return availableColors;
    }

    public void setAvailableColors(AvailableColors availableColors) {
        this.availableColors = availableColors;
    }
}
