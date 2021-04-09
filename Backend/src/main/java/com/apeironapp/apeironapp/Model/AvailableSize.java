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
}
