package com.jaywant.Model;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class User implements UserDetails{

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int userId;
	
	private String fname;
	
	private String lname;
	
	private String email;
	
	private String password;
	
	private String phone;
	
	private String role;
	
	@OneToMany
	@JsonManagedReference
	private List<Product> product;
	
	
	@OneToMany
	@JsonManagedReference
	private List<Cart> Cart;
	
	
	@OneToMany
	@JsonManagedReference

	private List<Order> Order;

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(int userId, String fname, String lname, String email, String password, String phone,
			List<Product> product, List<com.jaywant.Model.Cart> cart, List<com.jaywant.Model.Order> order,  String role) {
		super();
		this.userId = userId;
		this.fname = fname;
		this.lname = lname;
		this.email = email;
		this.password = password;
		this.phone = phone;
		this.product = product;
		this.role=role;
		Cart = cart;
		Order = order;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
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

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public List<Product> getProduct() {
		return product;
	}

	public void setProduct(List<Product> product) {
		this.product = product;
	}

	public List<Cart> getCart() {
		return Cart;
	}

	public void setCart(List<Cart> cart) {
		Cart = cart;
	}

	public List<Order> getOrder() {
		return Order;
	}

	public void setOrder(List<Order> order) {
		Order = order;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority(role));
	}

	@Override
	public String getUsername() {
		return this.email;
	}
	
	
	
	
	


	
	
	
}
