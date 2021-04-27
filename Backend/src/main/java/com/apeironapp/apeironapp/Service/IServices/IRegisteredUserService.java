package com.apeironapp.apeironapp.Service.IServices;

import com.apeironapp.apeironapp.DTO.PersonUserDTO;
import com.apeironapp.apeironapp.Model.PersonUser;
import com.apeironapp.apeironapp.Model.RegisteredUser;

import java.util.List;

public interface IRegisteredUserService {
    RegisteredUser findById(Integer id);
    List<RegisteredUser> findAll ();
    RegisteredUser save(PersonUserDTO userRequest);
    RegisteredUser update(PersonUserDTO personUserDTO);

    RegisteredUser findByEmail(String email);
}
