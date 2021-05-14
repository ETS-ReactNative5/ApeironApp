package com.apeironapp.apeironapp.Service.Implementations;

import com.apeironapp.apeironapp.DTO.AdminDTO;
import com.apeironapp.apeironapp.DTO.PersonUserDTO;
import com.apeironapp.apeironapp.Model.Address;
import com.apeironapp.apeironapp.Model.Admin;
import com.apeironapp.apeironapp.Model.Authority;
import com.apeironapp.apeironapp.Model.RegisteredUser;
import com.apeironapp.apeironapp.Repository.AdminRepository;
import com.apeironapp.apeironapp.Repository.AuthorityRepository;
import com.apeironapp.apeironapp.Repository.RegisteredUserRepository;
import com.apeironapp.apeironapp.Service.IServices.IAdminService;
import com.apeironapp.apeironapp.Service.IServices.IAuthorityService;
import com.apeironapp.apeironapp.Service.IServices.IRegisteredUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService implements IAdminService {

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    private IAuthorityService authService;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private AuthorityRepository authorityRepository;



    @Override
    public Admin findById(Integer id) {
        return adminRepository.findById(id).get();
    }

    @Override
    public List<Admin> findAll() {
        List<Admin> result = adminRepository.findAll();
        return result;
    }

    public Admin getLoggedUser() {

        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        String email = currentUser.getName();
        return adminRepository.findByEmail(email);

    }
    @Override
    public Admin update(AdminDTO adminDTO) {
        Admin admin = getLoggedUser();
        admin.setAboutUs(adminDTO.getAboutUs());
        admin.setPhoneNumber(adminDTO.getPhoneNumber());
        admin.setContactEmail(adminDTO.getContactEmail());
        com.apeironapp.apeironapp.Model.Address address = new Address();
        address.setCity(adminDTO.getAddress().getCity());
        address.setCountry(adminDTO.getAddress().getCountry());
        address.setLatitude(adminDTO.getAddress().getLatitude());
        address.setLongitude(adminDTO.getAddress().getLongitude());
        address.setStreet(adminDTO.getAddress().getStreet());
        admin.setAddress(address);


        return adminRepository.save(admin);
    }

    @Override
    public Admin findByEmail(String email) {
        Admin u = adminRepository.findByEmail(email);
        return u;
    }

    @Override
    public Admin save(PersonUserDTO userRequest) {
        Admin u = new Admin();
        u.setEmail(userRequest.getEmail());
        // pre nego sto postavimo lozinku u atribut hesiramo je
        u.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        Address address = new Address(userRequest.getAddress().getLatitude(), userRequest.getAddress().getLongitude(), userRequest.getAddress().getCity(), userRequest.getAddress().getStreet(), userRequest.getAddress().getCountry());
        u.setAddress(address);
        u.setPhoneNumber(userRequest.getPhonenumber());
        Authority authorityUser = authService.findByname("ROLE_ADMIN");
        List<Authority> auth = new ArrayList<Authority>();
        if(authorityUser==null) {
            authorityRepository.save(new Authority("ROLE_ADMIN"));
            auth.add(authService.findByname("ROLE_ADMIN"));
        }
        else {
            auth.add(authorityUser);
        }
        u.setAuthorities(auth);

        u = this.adminRepository.save(u);
        return u;
    }
}
