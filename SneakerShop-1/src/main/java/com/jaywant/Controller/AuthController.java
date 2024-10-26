package com.jaywant.Controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.jaywant.DTO.LoginRequest;
import com.jaywant.Model.Product;
import com.jaywant.Model.User;
import com.jaywant.Service.ProductService;
import com.jaywant.Service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {
	

    
	@Autowired
	private UserService userService;
	
	@Autowired
	private ProductService productService;

	@PostMapping("/save")
	public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            Map<String, Object> response = userService.register(user);
            return ResponseEntity.ok(response);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        }
    }
	
	@PostMapping("/login")
    public ResponseEntity<LoginRequest> login(@RequestBody LoginRequest loginRequest) {
        LoginRequest response = userService.login(loginRequest);
        
        if (response.getToken() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        return ResponseEntity.ok(response);
    }
	
	 @GetMapping("/profile")
	    public User showProfile() {
	    	 Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	            String email = authentication.getName();
	            User user = this.userService.showProfile(email);
	            return user;
	    }
	 
	 @GetMapping("/getAllProduct")
	    public ResponseEntity<List<Product>> getAllProduct() {
	        
	        List<Product> products = productService.getAllProduct();

	        return ResponseEntity.ok(products);
	    }
	 
	 @PutMapping("/update-profile")
	 public ResponseEntity<User> updateProfile(@RequestBody User user){
		 Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
         String email = authentication.getName();
		  User updateUser = this.userService.updateProfile(user, email);
		  return ResponseEntity.ok(updateUser);
	 }
	
}
