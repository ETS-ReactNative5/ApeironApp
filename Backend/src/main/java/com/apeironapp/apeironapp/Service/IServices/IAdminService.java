package com.apeironapp.apeironapp.Service.IServices;

import com.apeironapp.apeironapp.DTO.AdminDTO;
import com.apeironapp.apeironapp.DTO.PersonUserDTO;
import com.apeironapp.apeironapp.Model.Admin;
import com.apeironapp.apeironapp.Model.RegisteredUser;

import java.util.List;

public interface IAdminService {
    Admin findById(Integer id);
    List<Admin> findAll ();
    Admin update(AdminDTO adminDTO);
    Admin findByEmail(String email);
    Admin save(PersonUserDTO personUserDTO);
}
