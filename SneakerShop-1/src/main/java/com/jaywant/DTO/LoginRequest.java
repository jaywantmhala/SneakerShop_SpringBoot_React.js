package com.jaywant.DTO;

import java.util.List;

import com.jaywant.Model.User;


public class LoginRequest {

	private String email;
	
	private String password;
	
	private String role;
	
	private String token;

	public LoginRequest(String email, String password, String role, String token) {
		super();
		this.email = email;
		this.password = password;
		this.role = role;
		this.token = token;
	}

	public LoginRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	@Override
	public String toString() {
		return "LoginRequest [email=" + email + ", password=" + password + ", role=" + role + ", token=" + token + "]";
	}
	
	
}
