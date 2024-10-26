package com.jaywant.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.jaywant.DTO.LoginRequest;
import com.jaywant.JWT.JwtUtils;
import com.jaywant.Model.User;
import com.jaywant.Repo.UserRepo;

@Service
public class UserService {

	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtUtils jwtUtils;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	public Map<String, Object> register(User user) {
	    if (userRepo.existsByEmail(user.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already exists");
	    }

	    try {
	        user.setPassword(passwordEncoder.encode(user.getPassword())); 
	        User savedUser = userRepo.save(user); 
	        
	        String token = jwtUtils.generateToken(savedUser); 
	        
	        Map<String, Object> response = new HashMap<>();
	        response.put("user", savedUser); 
	        response.put("token", token); 
	        
	        return response; 
	    } catch (Exception e) {
	        throw new RuntimeException("Error saving user", e); 
	    }
	}


	
	public LoginRequest login(LoginRequest loginRequest) {
		LoginRequest response = new LoginRequest();
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword()));
			var user = this.userRepo.findByEmail(loginRequest.getEmail());
			var jwt = jwtUtils.generateToken(user);
			response.setToken(jwt);
			response.setRole(user.getRole());
			response.setEmail(user.getEmail());
			response.setPassword(user.getPassword());
		}
		
		catch(Exception e) {
		System.out.println(e.getMessage());
			
		}
		return response;
	}
	
	public User showProfile(String email) {
	User user= this.userRepo.findByEmail(email);
		return user;
	}
	
	
	public List<User> getAllUser(String email) {
	    User user = this.userRepo.findByEmail(email);
	    
	    return this.userRepo.findAll().stream()
	        .filter(u -> "USER".equals(u.getRole())) 
	        .collect(Collectors.toList()); 
	}
	
	
	public User updateProfile(User updateUser, String email) {
	    User user = this.userRepo.findByEmail(email);

	    user.setFname(updateUser.getFname());
	    user.setLname(updateUser.getLname());
	    user.setPassword(updateUser.getPassword());
	    user.setPhone(updateUser.getPhone());
	    return user;
	}

	

	
}
