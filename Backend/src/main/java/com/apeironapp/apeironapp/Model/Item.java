package com.apeironapp.apeironapp.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.annotations.Cascade;
import org.springframework.security.core.parameters.P;

import javax.persistence.*;
import javax.persistence.Entity;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="item_table")
public class Item {


    @Id
    @GeneratedValue
    @Column(name="id", unique=true, nullable=false)
    private Integer id;

    @Column(name = "type", nullable = true)
    private String type;

    @Column(name = "name", nullable = true)
    private String name;

    @Column(name = "price", nullable = true)
    private String price;

    @Column(name = "gender", nullable = true)
    private String gender;

    @JsonManagedReference(value="item-pictures")
    @OneToMany(mappedBy = "item", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Pictures> pictures = new HashSet<Pictures>();

    @JsonManagedReference(value="item-colors")
    @OneToMany(mappedBy = "item", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<AvailableColors> availableColors = new HashSet<AvailableColors>();


   /*@ManyToMany(mappedBy = "items")
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    private Set<Order> orders = new HashSet<Order>();*/

   @JsonManagedReference(value="item-iteminorder")
   @OneToMany(mappedBy = "item", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
   private Set<ItemInOrder> itemInOrders = new HashSet<ItemInOrder>();


    public Item() {
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Set<Pictures> getPictures() {
        return pictures;
    }

    public void setPictures(Set<Pictures> pictures) {
        this.pictures = pictures;
    }

    public Set<AvailableColors> getAvailableColors() {
        return availableColors;
    }

    public void setAvailableColors(Set<AvailableColors> availableColors) {
        this.availableColors = availableColors;
    }


}
