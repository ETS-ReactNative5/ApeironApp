package com.apeironapp.apeironapp.Service.IServices;

import java.util.List;
import java.util.UUID;

import org.springframework.security.core.userdetails.UserDetailsService;

import quince_it.security.entities.User;


public interface UserService extends UserDetailsService {

	void changePassword(String oldPassword, String newPassword);
	
    List<User> findAll();
    
    List<User> findAllIntermediate();
    
    List<User> findAllEndEntity();
    
	UUID getLoggedUserId();
	
	User findById(UUID id);
	
}
