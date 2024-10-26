package com.jaywant.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name="orders")
public class Order {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int orderId;

    private String productName;

    private int price;

    private int quantity;

    private LocalDate orderDate;

    private LocalDate recieveDate;
    
    private String image;

    private  String Status;
    
    @JsonBackReference
    @ManyToOne
    private User user;
    
    private String paymentStatus;

    public Order() {
        this.orderDate = LocalDate.now();
        
        this.recieveDate = this.orderDate.plusDays(3); 
    }

    

    public Order(int orderId, String productName, int price, int quantity, LocalDate orderDate, LocalDate recieveDate,
			String image, String status, User user, String paymentStatus) {
		super();
		this.orderId = orderId;
		this.productName = productName;
		this.price = price;
		this.quantity = quantity;
		this.orderDate = orderDate;
		this.recieveDate = recieveDate;
		this.image = image;
		this.Status = status;
		this.user = user;
		this.paymentStatus=paymentStatus;
	}



	public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public LocalDate getRecieveDate() {
        return recieveDate;
    }

    public void setRecieveDate(LocalDate recieveDate) {
        this.recieveDate = recieveDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}


	public String getStatus() {
		return Status;
	}


	public void setStatus(String status) {
		Status = status;
	}



	public String getPaymentStatus() {
		return paymentStatus;
	}



	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}
    
	
    
}
