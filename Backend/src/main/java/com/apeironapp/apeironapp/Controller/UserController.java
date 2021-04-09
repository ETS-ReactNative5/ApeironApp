package com.apeironapp.apeironapp.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import quince_it.security.entities.User;
import quince_it.security.services.implementation.UserServiceImpl;

@RestController
@RequestMapping(value = "api/users")
public class UserController {

	@Autowired
	private UserServiceImpl userService;
	
	
	 @GetMapping("/admin")
	 //@PreAuthorize("anyRole('SYSTEM_ADMIN')")
	 @CrossOrigin
	    ResponseEntity<List<User>> getAllAdmin()
	    {

	        List<User> users = userService.findAll();
	        return users == null ?
	                new ResponseEntity<>(HttpStatus.NOT_FOUND) :
	                ResponseEntity.ok(users);
	    }
	
	 
	 @GetMapping("/intermediate")
	 //@PreAuthorize("anyRole('SYSTEM_ADMIN')")
	 @CrossOrigin
	    ResponseEntity<List<User>> getAllIntermediate()
	    {

	        List<User> users = userService.findAllIntermediate();
	        return users == null ?
	                new ResponseEntity<>(HttpStatus.NOT_FOUND) :
	                ResponseEntity.ok(users);
	    }
	
	 
	 
	 @GetMapping("/end-entity")
	 //@PreAuthorize("anyRole('SYSTEM_ADMIN')")
	 @CrossOrigin
	    ResponseEntity<List<User>> getAllEndEntity()
	    {

	        List<User> users = userService.findAllEndEntity();
	        return users == null ?
	                new ResponseEntity<>(HttpStatus.NOT_FOUND) :
	                ResponseEntity.ok(users);
	    }
	
	
	
}
