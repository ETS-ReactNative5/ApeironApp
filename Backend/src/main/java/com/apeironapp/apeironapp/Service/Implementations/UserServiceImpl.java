package com.apeironapp.apeironapp.Service.Implementations;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import quince_it.security.entities.User;
import quince_it.security.repository.UserRepository;
import quince_it.security.services.contracts.UserService;

@Service
public class UserServiceImpl implements UserService{

	protected final Log LOGGER = LogFactory.getLog(getClass());

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(email);
		if (user == null) {
			throw new UsernameNotFoundException(String.format("No user found with username '%s'.", email));
		} else {
			return user;
		}
	}

	@Override
	public void changePassword(String oldPassword, String newPassword) {
		UUID loggedUserId = getLoggedUserId();
		User user = userRepository.findById(loggedUserId).get();
		
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), oldPassword));
		
		if(newPassword.isEmpty())
			throw new IllegalArgumentException("Invalid new password");
		
		user.setPassword(passwordEncoder.encode(newPassword));
		userRepository.save(user);
	}
	
	@Override
	public UUID getLoggedUserId() {
		
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		String email = currentUser.getName();
		User user = userRepository.findByEmail(email);
		
		return user.getId();
	}

	@Override
	public List<User> findAll() {
		
		return userRepository.findAll();
	}


	@Override
	public User findById(UUID id) {
		return userRepository.findById(id).get();
	}

	@Override
	public List<User> findAllIntermediate() {
		List<User> intermediateUsers = new ArrayList<User>();
		
		for(User user: userRepository.findAll()) {
			if(user.hasAuthority("ROLE_INTERMEDIATE")) {
				intermediateUsers.add(user);
			}
		}
		return intermediateUsers;
	}

	@Override
	public List<User> findAllEndEntity() {
	List<User> endEntityUsers = new ArrayList<User>();
		
		for(User user: userRepository.findAll()) {
			if(user.hasAuthority("ROLE_USER")) {
				endEntityUsers.add(user);
			}
		}
		return endEntityUsers;
	}

}
