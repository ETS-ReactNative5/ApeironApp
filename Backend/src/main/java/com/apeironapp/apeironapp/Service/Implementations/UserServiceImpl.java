package com.apeironapp.apeironapp.Service.Implementations;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.apeironapp.apeironapp.DTO.IdentifiableDTO;
import com.apeironapp.apeironapp.DTO.PersonUserDTO;
import com.apeironapp.apeironapp.DTO.UserDTO;
import com.apeironapp.apeironapp.DTO.UserRequestDTO;
import com.apeironapp.apeironapp.Exception.ResourceConflictException;
import com.apeironapp.apeironapp.Model.Address;
import com.apeironapp.apeironapp.Model.Authority;
import com.apeironapp.apeironapp.Model.PersonUser;
import com.apeironapp.apeironapp.Model.RegisteredUser;
import com.apeironapp.apeironapp.Repository.UserRepository;
import com.apeironapp.apeironapp.Service.IServices.IAuthorityService;
import com.apeironapp.apeironapp.Service.IServices.UserService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.apeironapp.apeironapp.Repository.AuthorityRepository;


@Service
public class UserServiceImpl implements UserService {


	@Autowired
	private UserRepository personUserRepository;


	@Autowired
	private PasswordEncoder passwordEncoder;


	@Autowired
	private IAuthorityService authService;


	@Autowired
	private AuthorityRepository authorityRepository;

	@Override
	public PersonUser findById(Integer id) {
		return personUserRepository.findById(id).get();
	}


	@Override
	public PersonUser findByEmail(String email) throws UsernameNotFoundException {
		PersonUser u = personUserRepository.findByEmail(email);
		return u;
	}
	@Override
	public RegisteredUser save(PersonUserDTO userRequest) {
		RegisteredUser u = new RegisteredUser();
		u.setEmail(userRequest.getEmail());
		// pre nego sto postavimo lozinku u atribut hesiramo je
		u.setPassword(passwordEncoder.encode(userRequest.getPassword()));
		u.setName(userRequest.getFirstname());
		u.setSurname(userRequest.getSurname());
		Address address = new Address(userRequest.getAddress().getLatitude(), userRequest.getAddress().getLongitude(), userRequest.getAddress().getCity(), userRequest.getAddress().getStreet(), userRequest.getAddress().getCountry());
		u.setAddress(address);
		u.setPhoneNumber(userRequest.getPhonenumber());
		Authority authorityUser = authService.findByname("ROLE_USER");
		List<Authority> auth = new ArrayList<Authority>();
		if(authorityUser==null) {
			authorityRepository.save(new Authority("ROLE_USER"));
			auth.add(authService.findByname("ROLE_USER"));
		}
		else {
			auth.add(authorityUser);
		}
		u.setAuthorities(auth);

		u = this.personUserRepository.save(u);
		return u;
	}

	public PersonUserDTO getUserDTO() {

		PersonUser user = getLoggedUser();

		PersonUserDTO userDTO = new PersonUserDTO();
		userDTO.setEmail(user.getEmail());
		userDTO.setId(user.getId());
		return userDTO;
	}

	public PersonUser getLoggedUser() {

		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		String email = currentUser.getName();
		return personUserRepository.findByEmail(email);

	}
	/*public RegisteredUser update(PersonUserDTO userDTO) {
		PersonUser user = getLoggedUser();
		RegisteredUser registeredUser = findByIdRegistered(user.getId());
		registeredUser.setName(userDTO.getFirstname());
		registeredUser.setEmail(userDTO.getEmail());


		return personUserRepository.save(registeredUser);
	}*/

	/*public User changePassword(String oldPassword, String newPassword) {

		User user = getLoggedUser();

		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), oldPassword));

		if(newPassword.isEmpty())
			throw new IllegalArgumentException("Invalid new password");

		user.setPassword(passwordEncoder.encode(newPassword));
		return userRepository.save(user);
	}*/

	public List<PersonUser> findAll() throws AccessDeniedException {
		List<PersonUser> result = personUserRepository.findAll();
		return result;
	}

}
