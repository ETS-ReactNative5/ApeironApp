package com.apeironapp.apeironapp.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.sql.Timestamp;
import java.util.List;

@Entity
@DiscriminatorValue("Admin")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Admin extends PersonUser{

    public Admin() {
    }


}
