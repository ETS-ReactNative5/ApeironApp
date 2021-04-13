package com.apeironapp.apeironapp.Controller;

import java.util.List;

import com.apeironapp.apeironapp.Model.PersonUser;
import com.apeironapp.apeironapp.Service.Implementations.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "api/users")
public class UserController {

	@Autowired
	private UserServiceImpl userService;
	
	
	 @GetMapping("/")
	 //@PreAuthorize("anyRole('SYSTEM_ADMIN')")
	 @CrossOrigin
	    ResponseEntity<List<PersonUser>> getAllAdmin()
	    {

	        List<PersonUser> users = userService.findAll();
	        return users == null ?
	                new ResponseEntity<>(HttpStatus.NOT_FOUND) :
	                ResponseEntity.ok(users);
	    }
	
	 

	
	
	
}
