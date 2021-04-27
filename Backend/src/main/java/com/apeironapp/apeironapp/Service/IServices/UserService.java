package com.apeironapp.apeironapp.Service.IServices;

import java.util.List;
import java.util.UUID;

import com.apeironapp.apeironapp.DTO.PersonUserDTO;
import com.apeironapp.apeironapp.DTO.UserRequestDTO;
import com.apeironapp.apeironapp.Model.Order;
import com.apeironapp.apeironapp.Model.PersonUser;
import com.apeironapp.apeironapp.Model.RegisteredUser;
import org.springframework.security.core.userdetails.UserDetailsService;



public interface UserService {
    PersonUser findById(Integer id);
    PersonUser findByEmail(String email);
    List<PersonUser> findAll ();
    PersonUser save(PersonUserDTO userRequest);
	
}
