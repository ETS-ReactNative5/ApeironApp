package com.apeironapp.apeironapp.Service.Implementations;

import com.apeironapp.apeironapp.DTO.AddressDTO;
import com.apeironapp.apeironapp.DTO.PersonUserDTO;
import com.apeironapp.apeironapp.Model.Address;
import com.apeironapp.apeironapp.Model.PersonUser;
import com.apeironapp.apeironapp.Model.RegisteredUser;
import com.apeironapp.apeironapp.Repository.RegisteredUserRepository;
import com.apeironapp.apeironapp.Repository.UserRepository;
import com.apeironapp.apeironapp.Service.IServices.IRegisteredUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegisteredUserService implements IRegisteredUserService {


    @Autowired
    private RegisteredUserRepository registeredUserRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public RegisteredUser findById(Integer id) {
        return registeredUserRepository.findById(id).get();
    }



    @Override
    public List<RegisteredUser> findAll() throws AccessDeniedException {
        List<RegisteredUser> result = registeredUserRepository.findAll();
        return result;
    }

    @Override
    public RegisteredUser save(PersonUserDTO userRequest) {
        return null;
    }

    @Override
    public RegisteredUser update(PersonUserDTO personUserDTO) {
        RegisteredUser user = getLoggedUser();
        user.setName(personUserDTO.getFirstname());
        user.setSurname(personUserDTO.getSurname());
        user.setPhoneNumber(personUserDTO.getPhonenumber());
        com.apeironapp.apeironapp.Model.Address address = new Address();
        address.setCity(personUserDTO.getAddress().getCity());
        address.setCountry(personUserDTO.getAddress().getCountry());
        address.setLatitude(personUserDTO.getAddress().getLatitude());
        address.setLongitude(personUserDTO.getAddress().getLongitude());
        address.setStreet(personUserDTO.getAddress().getStreet());
        user.setAddress(address);
        return registeredUserRepository.save(user);
    }

    @Override
    public RegisteredUser findByEmail(String email)throws UsernameNotFoundException {
        RegisteredUser u = registeredUserRepository.findByEmail(email);
        return u;
    }

    public PersonUserDTO getUserDTO() {

        RegisteredUser user = getLoggedUser();

        PersonUserDTO userDTO = new PersonUserDTO();
        userDTO.setEmail(user.getEmail());
        userDTO.setFirstname(user.getName());
        userDTO.setSurname(user.getSurname());
        userDTO.setId(user.getId());
        userDTO.setPhonenumber(user.getPhoneNumber());
        AddressDTO addressDTO = new AddressDTO();
        addressDTO.setCity(user.getAddress().getCity());
        addressDTO.setCountry(user.getAddress().getCountry());
        addressDTO.setLatitude(user.getAddress().getLatitude());
        addressDTO.setLongitude(user.getAddress().getLongitude());
        addressDTO.setStreet(user.getAddress().getStreet());
        userDTO.setAddress(addressDTO);
        return userDTO;
    }



    public RegisteredUser changePassword(String oldPassword, String newPassword) {

        RegisteredUser user = getLoggedUser();

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), oldPassword));

        if(newPassword.isEmpty())
            throw new IllegalArgumentException("Invalid new password");

        user.setPassword(passwordEncoder.encode(newPassword));
        return registeredUserRepository.save(user);
    }

    public RegisteredUser getLoggedUser() {

        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        String email = currentUser.getName();
        return registeredUserRepository.findByEmail(email);

    }
}
