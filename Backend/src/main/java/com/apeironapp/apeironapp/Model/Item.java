package com.apeironapp.apeironapp.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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

    @JsonManagedReference
    @OneToMany(mappedBy = "item", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Pictures> pictures = new HashSet<Pictures>();

    @JsonManagedReference
    @OneToMany(mappedBy = "item", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<AvailableColors> availableColors = new HashSet<AvailableColors>();


    @ManyToMany(mappedBy = "items")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    private Set<Order> orders = new HashSet<Order>();



}
