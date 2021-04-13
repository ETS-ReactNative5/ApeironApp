package com.apeironapp.apeironapp.Repository;

import com.apeironapp.apeironapp.Model.Authority;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AuthorityRepository extends JpaRepository<Authority, Integer> {
    Authority findByName(String name);
}