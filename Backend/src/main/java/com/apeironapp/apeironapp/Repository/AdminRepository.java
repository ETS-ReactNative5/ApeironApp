package com.apeironapp.apeironapp.Repository;

import com.apeironapp.apeironapp.Model.Admin;
import com.apeironapp.apeironapp.Model.ItemInOrder;
import com.apeironapp.apeironapp.Model.RegisteredUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    Admin findByEmail(String email );
}
