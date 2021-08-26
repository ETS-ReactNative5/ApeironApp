package com.apeironapp.apeironapp.Controller;

import com.apeironapp.apeironapp.DTO.*;
import com.apeironapp.apeironapp.Exception.ResourceConflictException;
import com.apeironapp.apeironapp.Model.*;
import com.apeironapp.apeironapp.Service.Implementations.AdminService;
import com.apeironapp.apeironapp.Service.Implementations.ColorService;
import com.apeironapp.apeironapp.Service.Implementations.RegisteredUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping(value = "api/admin")

@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AdminController {


    @Autowired
    private AdminService adminService;


    @Autowired
    private RegisteredUserService registeredUserService;

    @Autowired
    private ColorService colorService;

    @GetMapping("")
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<RegisteredUser> getUser() {

        RegisteredUser userDTO = new RegisteredUser();
        userDTO = registeredUserService.findByEmail("admin@a.com");
        return  ResponseEntity.ok(userDTO);
    }

    @GetMapping("/colors")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Colors>> getColors() {
        List<Colors> colors = colorService.findAll();
        return  ResponseEntity.ok(colors);
    }

    @GetMapping("/deleteColor/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> deleteColor(@PathVariable Integer id) {
        Colors colors = colorService.findById(id);
        colorService.delete(colors);
        return colors == null ? new ResponseEntity<>(HttpStatus.NOT_FOUND)
                : new ResponseEntity<>("Color is successfully deleted!", HttpStatus.CREATED);
    }

    @PostMapping("/newColor")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> addColor(@RequestBody ColorDTO colorDTO) {
        System.out.println(colorDTO.getColor());

        Colors colors = colorService.save(colorDTO);

        return colors == null ? new ResponseEntity<>(HttpStatus.NOT_FOUND)
                : new ResponseEntity<>("Color is successfully added!", HttpStatus.CREATED);
    }

    @PostMapping("/signup")
    public ResponseEntity<PersonUser> addUser(@RequestBody PersonUserDTO userRequest, UriComponentsBuilder ucBuilder) {

        PersonUser existUser = this.adminService.findByEmail(userRequest.getEmail());
        if (existUser != null) {
            throw new ResourceConflictException(userRequest.getEmail(), "Email already exists");
        }

        PersonUser user = this.adminService.save(userRequest);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/api/auth/{userId}").buildAndExpand(user.getId()).toUri());
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateAdmin(@RequestBody PersonUserDTO userDTO) {
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
}
