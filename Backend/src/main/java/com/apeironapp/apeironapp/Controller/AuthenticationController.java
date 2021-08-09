package com.apeironapp.apeironapp.Controller;
import java.util.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.apeironapp.apeironapp.Authentification.JwtAuthenticationRequest;
import com.apeironapp.apeironapp.Authentification.TokenUtils;
import com.apeironapp.apeironapp.DTO.PersonUserDTO;
import com.apeironapp.apeironapp.Exception.ResourceConflictException;
import com.apeironapp.apeironapp.Model.Authority;
import com.apeironapp.apeironapp.Model.PersonUser;
import com.apeironapp.apeironapp.Model.UserTokenState;
import com.apeironapp.apeironapp.Service.IServices.UserService;
import com.apeironapp.apeironapp.Service.Implementations.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping(value = "/api/auth", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthenticationController {

	@Autowired
	private TokenUtils tokenUtils;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private CustomUserDetailsService userDetailsService;

	@Autowired
	private UserService userService;

	@PostMapping("/login")
	public ResponseEntity<UserTokenState> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest,
																	HttpServletResponse response) {
		List<String> roles = new ArrayList<String>();
		String jwt;
		int expiresIn;
		try {
			Authentication authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(),
							authenticationRequest.getPassword()));

			SecurityContextHolder.getContext().setAuthentication(authentication);

			PersonUser user = (PersonUser) authentication.getPrincipal();
			jwt = tokenUtils.generateToken(user.getUsername());
			expiresIn = tokenUtils.getExpiredIn();
			user.getAuthorities().forEach((a) -> roles.add(a.getAuthority()));
		}
		catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<UserTokenState>(new UserTokenState(jwt, (long) expiresIn, roles), HttpStatus.OK);
	}




	// U slucaju isteka vazenja JWT tokena, endpoint koji se poziva da se token osvezi
/*	@PostMapping(value = "/refresh")
	public ResponseEntity<UserTokenState> refreshAuthenticationToken(HttpServletRequest request) {

		String token = tokenUtils.getToken(request);
		String username = this.tokenUtils.getUsernameFromToken(token);
		PersonUser user = (PersonUser) this.userDetailsService.loadUserByUsername(username);

		if (this.tokenUtils.canTokenBeRefreshed(token, user.getLastPasswordResetDate())) {
			String refreshedToken = tokenUtils.refreshToken(token);
			int expiresIn = tokenUtils.getExpiredIn();

			return ResponseEntity.ok(new UserTokenState(refreshedToken, Long.parseLong(expiresIn.));
		} else {
			UserTokenState userTokenState = new UserTokenState();
			return ResponseEntity.badRequest().body(userTokenState);
		}
	}*/




	static class PasswordChanger {
		public String oldPassword;
		public String newPassword;
		public String rewriteNewPassword;
	}

	@PostMapping("/signup")
	public ResponseEntity<PersonUser> addUser(@RequestBody PersonUserDTO userRequest, UriComponentsBuilder ucBuilder) {

		System.out.println(userRequest.getAddress());
		PersonUser existUser = this.userService.findByEmail(userRequest.getEmail());
		if (existUser != null) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}else {

			PersonUser user = this.userService.save(userRequest);
			HttpHeaders headers = new HttpHeaders();
			headers.setLocation(ucBuilder.path("/api/auth/{userId}").buildAndExpand(user.getId()).toUri());
			return new ResponseEntity<>(user, HttpStatus.CREATED);
		}
	}


	@PostMapping("/signupDelivery")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<PersonUser> signupDelivery(@RequestBody PersonUserDTO userRequest, UriComponentsBuilder ucBuilder) {
		System.out.println("fihfihfifhikfhfiuh");
		System.out.println(userRequest);
		PersonUser existUser = this.userService.findByEmail(userRequest.getEmail());
		if (existUser != null) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}else {

			PersonUser user = this.userService.saveDelivery(userRequest);
			HttpHeaders headers = new HttpHeaders();
			headers.setLocation(ucBuilder.path("/api/auth/{userId}").buildAndExpand(user.getId()).toUri());
			return new ResponseEntity<>(user, HttpStatus.CREATED);
		}
	}
}