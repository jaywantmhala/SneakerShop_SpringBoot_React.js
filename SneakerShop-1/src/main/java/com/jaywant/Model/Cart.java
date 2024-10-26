package com.jaywant.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;


@Entity
public class Cart {

	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int cartId;
	
	private String productName;
	
	private double price;
	
	private int quantity;
	
	private String image;
	
	@JsonBackReference
	@ManyToOne
	private User user;
	
	@JsonBackReference("product-cart")
	@ManyToOne
	    private Product product;
	
	
	public Cart() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Cart(int cartId, String productName, double price, int quantity, String image, User user, Product product) {
		super();
		this.cartId = cartId;
		this.productName = productName;
		this.price = price;
		this.quantity = quantity;
		this.image = image;
		this.user = user;
		this.product = product;
	}

	public int getCartId() {
		return cartId;
	}

	public void setCartId(int cartId) {
		this.cartId = cartId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	
	
}
