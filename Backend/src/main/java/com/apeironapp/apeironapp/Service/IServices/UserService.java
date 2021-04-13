package com.apeironapp.apeironapp.Service.IServices;

import java.util.List;
import java.util.UUID;

import com.apeironapp.apeironapp.DTO.PersonUserDTO;
import com.apeironapp.apeironapp.DTO.UserRequestDTO;
import com.apeironapp.apeironapp.Model.PersonUser;
import com.apeironapp.apeironapp.Model.RegisteredUser;
import org.springframework.security.core.userdetails.UserDetailsService;



public interface UserService extends UserDetailsService {

    PersonUser findById(Integer id);
    PersonUser findByEmail(String email);
    //PersonUser createPatient(UserRequestDTO entityDTO);
    List<PersonUser> findAll ();
    RegisteredUser save(PersonUserDTO userRequest);
    void delete(PersonUser userRequest);
   // PersonUser updateProfile(PersonUserDTO userRequest, Integer id);
    //PersonUser update(PersonUser userRequest);
	
}
