package com.apeironapp.apeironapp.Model;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import javax.persistence.Entity;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity

@Table(name="order_table")
public class Order {

    @Id
    @GeneratedValue
    @Column(name="id", unique=true, nullable=false)
    private Integer id;

    @JsonBackReference
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinColumn(name = "registeredUser_id", referencedColumnName = "id", nullable = true, unique = false)
    private RegisteredUser registeredUser;

    @ManyToMany
    @JsonIgnore
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JoinTable(name = "items_in_order", joinColumns = @JoinColumn(name = "item_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "order_id", referencedColumnName = "id"))
    private Set<Item> items = new HashSet<Item>();

    @Column(name = "quantity", nullable = true)
    private Integer quantity;

    @Column(name = "dateOfReservation", nullable = true)
    private LocalDate dateOfReservation;

    @Column(name = "dueDate", nullable = true)
    private LocalDate dueDate;
}
