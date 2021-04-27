package com.apeironapp.apeironapp.Controller;

import java.util.List;

import com.apeironapp.apeironapp.DTO.PasswordChanger;
import com.apeironapp.apeironapp.DTO.PersonUserDTO;
import com.apeironapp.apeironapp.DTO.UserDTO;
import com.apeironapp.apeironapp.Model.PersonUser;
import com.apeironapp.apeironapp.Service.Implementations.RegisteredUserService;
import com.apeironapp.apeironapp.Service.Implementations.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "api/users")

@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

	@Autowired
	private UserServiceImpl userService;

	@Autowired
	private RegisteredUserService registeredUserService;
	
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


	@GetMapping("")
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<PersonUserDTO> getUser() {

		PersonUserDTO userDTO = registeredUserService.getUserDTO();
		return userDTO == null ?
				new ResponseEntity<>(HttpStatus.NOT_FOUND) :
				ResponseEntity.ok(userDTO);
	}

	@PutMapping("/update")
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<?> updateUser(@RequestBody PersonUserDTO userDTO) {
		try {
			registeredUserService.update(userDTO);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}catch (IllegalArgumentException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/changePassword")
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<?> changePasswordUser(@RequestBody PasswordChanger passwordChanger) {
		try {
			registeredUserService.changePassword(passwordChanger.getOldPassword(), passwordChanger.getNewPassword());
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (IllegalArgumentException e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	 

	
	
	
}
