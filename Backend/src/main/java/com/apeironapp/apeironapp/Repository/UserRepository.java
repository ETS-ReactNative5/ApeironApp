package com.apeironapp.apeironapp.Repository;

import java.util.UUID;

import com.apeironapp.apeironapp.Model.PersonUser;
import com.apeironapp.apeironapp.Model.RegisteredUser;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.imageio.spi.RegisterableService;


public interface UserRepository extends JpaRepository<PersonUser, Integer> {
    PersonUser findByEmail( String email );
}

