package com.apeironapp.apeironapp.Controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api/auth", produces = MediaType.APPLICATION_JSON_VALUE)

@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthenticationController {

	@Autowired
	private TokenUtils tokenUtils;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private CertificateService certificateService;

	@PostMapping("/login")
	@CrossOrigin
	public ResponseEntity<UserTokenStateDTO> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest,
			HttpServletResponse response) {
		
		String jwt;
		int expiresIn;
		List<String> roles = new ArrayList<String>();
		
		try {
			Authentication authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
							authenticationRequest.getPassword()));
			
	
			SecurityContextHolder.getContext().setAuthentication(authentication);
			User user = (User) authentication.getPrincipal();
			jwt = tokenUtils.generateToken(user.getUsername());
			expiresIn = tokenUtils.getExpiredIn();
			user.getUserAuthorities().forEach((a) -> roles.add(a.getName()));

		} catch (BadCredentialsException e) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
			
		return new ResponseEntity<UserTokenStateDTO>(new UserTokenStateDTO(jwt, expiresIn, roles), HttpStatus.OK);
	}

	@PostMapping("/change-password")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')") // or hasRole....
	public ResponseEntity<?> changePassword(@RequestBody PasswordChanger passwordChanger) {
		
		try {
			userService.changePassword(passwordChanger.oldPassword, passwordChanger.newPassword);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (BadCredentialsException e){
			return new ResponseEntity<>(HttpStatus.FORBIDDEN);
		} catch (IllegalArgumentException e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	static class PasswordChanger {
		public String oldPassword;
		public String newPassword;
	}
	
}