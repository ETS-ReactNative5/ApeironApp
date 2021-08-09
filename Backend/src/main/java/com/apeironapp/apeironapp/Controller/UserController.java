package com.apeironapp.apeironapp.Controller;

import java.util.List;

import com.apeironapp.apeironapp.DTO.MessageDTO;
import com.apeironapp.apeironapp.DTO.PasswordChanger;
import com.apeironapp.apeironapp.DTO.PersonUserDTO;
import com.apeironapp.apeironapp.DTO.UserDTO;
import com.apeironapp.apeironapp.Model.Courier;
import com.apeironapp.apeironapp.Model.PersonUser;
import com.apeironapp.apeironapp.Repository.CourirRepository;
import com.apeironapp.apeironapp.Service.Implementations.RegisteredUserService;
import com.apeironapp.apeironapp.Service.Implementations.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;


@RestController
@RequestMapping(value = "api/users")

@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

	@Autowired
	private Environment environment;

	@Autowired
	JavaMailSenderImpl mailSender;

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

	@GetMapping("/delivery")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	ResponseEntity<List<Courier>> getAllDelivery()
	{

		List<Courier> users = userService.findAllDelivery();
		return users == null ?
				new ResponseEntity<>(HttpStatus.NOT_FOUND) :
				ResponseEntity.ok(users);
	}
	@GetMapping("/delete/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<String> delete(@PathVariable Integer id)
	{

		 userService.delete(id);
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
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

	@PostMapping("/sendMessage")
	public ResponseEntity<?> sendMEssage(@RequestBody MessageDTO messageDTO) {


			System.out.println(messageDTO);
			SimpleMailMessage mail = new SimpleMailMessage();
			mail.setTo(environment.getProperty("spring.mail.username"));
			mail.setSubject("Contact message!");
			mail.setFrom(messageDTO.getEmail());
			//mail.setFrom("pharmacyisa@gmail.com");
			mail.setText("You have a message from : "
					+ messageDTO.getFirstName() + " " + messageDTO.getSurname() + " :" + messageDTO.getMessage() + "." +
					" \n Phone number is "+ messageDTO.getPhoneNumber()+".");

			mailSender.send(mail);

			return new ResponseEntity<>(HttpStatus.NO_CONTENT);

	}
	 

	
	
	
}
