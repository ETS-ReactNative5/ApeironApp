package com.apeironapp.apeironapp.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import javax.persistence.Entity;
import java.util.HashSet;
import java.util.Set;

@Entity

@Table(name="Colors_table")
public class AvailableColors {

    @Id
    @GeneratedValue
    @Column(name="id", unique=true, nullable=false)
    private Integer id;

    @Column(name = "color", nullable = true)
    private String color;

    @Column(name = "quantity", nullable = true)
    private Integer quantity;


    @JsonManagedReference
    @OneToMany(mappedBy = "availableColors", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<AvailableSize> availableSizes = new HashSet<AvailableSize>();

    @JsonBackReference(value="item-colors")
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", referencedColumnName = "id", nullable = false, unique = false)
    private Item item;

    public AvailableColors() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Set<AvailableSize> getAvailableSizes() {
        return availableSizes;
    }

    public void setAvailableSizes(Set<AvailableSize> availableSizes) {
        this.availableSizes = availableSizes;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }
}
