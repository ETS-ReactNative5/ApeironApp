package com.apeironapp.apeironapp.Repository;

import java.util.UUID;

import com.apeironapp.apeironapp.Model.PersonUser;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<PersonUser, UUID> {
    PersonUser findByEmail ( String email );
}

