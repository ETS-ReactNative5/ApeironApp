package com.apeironapp.apeironapp.Repository;

import com.apeironapp.apeironapp.Model.Courier;
import com.apeironapp.apeironapp.Model.RegisteredUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourirRepository extends JpaRepository<Courier, Integer> {
    Courier findByEmail( String email );
}
