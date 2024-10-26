package com.jaywant.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jaywant.Model.Cart;
import com.jaywant.Model.Order;
import com.jaywant.Model.User;
import com.jaywant.Repo.OrderRepo;
import com.jaywant.Repo.UserRepo;

@Service
public class OrderService {

	
	@Autowired
	private OrderRepo orderRepo;
	
	@Autowired
	private UserRepo userRepo;
	
	public List<Order> getAllOrder(String email) {
	    User user = this.userRepo.findByEmail(email);
	    
	   return this.orderRepo.findAll().stream().filter(order->order.getUser().equals(user)).collect(Collectors.toList());
	}

	
	
//	
	
	public Order createOrder(String email, Order order) {
	    User user = this.userRepo.findByEmail(email);

	    if (user == null) {
	        throw new RuntimeException("User not found with email: " + email);
	    }

	    order.setUser(user);

	    order.setOrderDate(LocalDate.now()); 
	    order.setStatus("ORDERD"); 
	    Order savedOrder = this.orderRepo.save(order);

	    return savedOrder; 
	}
	
	public Order cancelOrder(int orderId, String email, String status) {
	    User user = userRepo.findByEmail(email);

Order order = orderRepo.findById(orderId).orElseThrow(() -> new NoSuchElementException("Cart not found"));
	  order.setStatus(status);
	    return orderRepo.save(order); 
	}

	public List<Order> getOrder(String email) {
	    List<Order> allOrders = this.orderRepo.findAll();
	    return allOrders.stream()
	            .filter(order -> !order.getUser().getEmail().equals(email)) 
	            .collect(Collectors.toList());
	}
	
	public Order changeStatus(int orderId, String email, String status) {
		Order order = orderRepo.findById(orderId).orElseThrow(() -> new NoSuchElementException("Cart not found"));
		  order.setStatus(status);
		    return orderRepo.save(order); 
	}

	
}
