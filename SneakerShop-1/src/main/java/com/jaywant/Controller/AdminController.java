package com.jaywant.Controller;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jaywant.Model.Cart;
import com.jaywant.Model.Order;
import com.jaywant.Model.Product;
import com.jaywant.Model.User;
import com.jaywant.Service.CartService;
import com.jaywant.Service.OrderService;
import com.jaywant.Service.ProductService;
import com.jaywant.Service.UserService;

@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private CartService cartService;
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private UserService userService;

	
	@PostMapping(value="/create-product",consumes = "application/json", produces = "application/json")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        try {
        	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    		String email = authentication.getName();
            Product createdProduct = productService.createProduct(product, email);
            return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	

	
	@GetMapping("/all-order")
	public ResponseEntity<List<Order>> getAllOrder(){
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    		String email = authentication.getName();
			List<Order> allOrder = this.orderService.getOrder(email);
	        return ResponseEntity.ok(allOrder);

		}
		catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

		
		
		
	}
	
	 @PutMapping("/status/{orderId}")
		public ResponseEntity<Order> changeStatus( @PathVariable int orderId, @RequestBody Map<String, String> requestBody) {

		    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		    String email = authentication.getName();
		    String status = requestBody.get("status");

		    try {
		        Order updatedOrder = orderService.changeStatus(orderId, email, status);
		        return ResponseEntity.ok(updatedOrder);
		    } catch (NoSuchElementException e) {
		        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		    }
		}
	 
	 
	 @GetMapping("/all-user")
	 public ResponseEntity<List<User>> getAllUser(){
		 Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		    String email = authentication.getName();
		    List<User> allUser= this.userService.getAllUser(email);
		    return ResponseEntity.ok(allUser);
	 }
	
	@PostMapping("/print")
	public String adminPage() {
		return "ADMIN PAGE";
	}
	
	@DeleteMapping("/delete-product/{productId}")
	public void deleteProduct(@PathVariable int productId){
		 Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		    String email = authentication.getName();
		    this.productService.deleteProduct(productId, email);
	}
	
	
	
}
