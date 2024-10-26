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
import com.jaywant.Model.User;
import com.jaywant.Service.CartService;
import com.jaywant.Service.EmailService;
import com.jaywant.Service.OrderService;


@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private CartService cartService;
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private EmailService emailService;
	
	@GetMapping("/user")
	public String message() {
		return "USER PAGE";
	}
	
	
	@PostMapping("/add-cart/{productId}")
    public ResponseEntity<Cart> addCart(@RequestBody Cart cart, @PathVariable int productId) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getName();
        Cart savedCart = cartService.addCart(cart, productId, email);
        System.out.println(cart);
        return ResponseEntity.ok(savedCart);
    }
	
	@PutMapping("/update-cart/{cartId}")
	public ResponseEntity<Cart> updateCartQuantity(
	    @PathVariable int cartId, 
	    @RequestBody Map<String, Integer> requestBody) { 

	    try {
	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	        String email = authentication.getName();

	        Integer newQuantity = requestBody.get("quantity");
	        
	        Cart updatedCart = cartService.updateCart(cartId, email, newQuantity); 

	        return ResponseEntity.ok(updatedCart);
	    } catch (NoSuchElementException | IllegalArgumentException e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
	    }
	}
	
	@PutMapping("/cancel-order/{orderId}")
	public ResponseEntity<Order> cancelOrder( @PathVariable int orderId, @RequestBody Map<String, String> requestBody) {

	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    String email = authentication.getName();
	    String status = requestBody.get("status");

	    try {
	        Order updatedOrder = orderService.cancelOrder(orderId, email, status);
	        return ResponseEntity.ok(updatedOrder);
	    } catch (NoSuchElementException e) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	    }
	}


	
	
	@GetMapping("/getAllCart")
	public ResponseEntity<List<Cart>> getAllCartItemByUser() {
	    try {
	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	        String email = authentication.getName();

	        List<Cart> cartItems = this.cartService.getAllCartItem(email);

	        return ResponseEntity.ok(cartItems);

	    } catch (NoSuchElementException | IllegalArgumentException e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
	    }
	}
	
	

	    @GetMapping("/getCart/{id}")
	    public ResponseEntity<Cart> getCartById(@PathVariable int id) {
	        try {
	            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	            String email = authentication.getName();

	            Cart cart = cartService.getCartById(id, email);
          if (cart == null) {
	                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	            }

           return ResponseEntity.ok(cart);

	        } catch (NoSuchElementException e) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
	        }
	    }
	    
	    @DeleteMapping("/delete-cart/{cartId}")
	    public ResponseEntity<String> deleteCartById(@PathVariable int cartId) {
	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	        String email = authentication.getName(); 

	        try {
	            cartService.deleteCartById(email, cartId);
	            return ResponseEntity.ok("Cart item deleted successfully.");
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Failed to delete cart item: " + e.getMessage());
	        }
	    }
	    

	    
	    @PostMapping("/create-order")
	    public ResponseEntity<String> createOrder(@RequestBody Order order) {
	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	        String email = authentication.getName(); 

	        try {
	            orderService.createOrder(email, order); 

	            String subject = "Order Confirmation Of Your Order: " + order.getOrderId();
	            String message = "<html>"
	                    + "<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>"
	                    + "<div style='max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;'>"
	                    + "<h2 style='color: #4CAF50; text-align: center;'>Dear " + email + ",</h2>"
	                    + "<p style='font-size: 16px;'>Thank you for your order! Your order has been successfully created.</p>"
	                    + "<div style='background-color: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);'>"
	                    + "<h3 style='color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 5px;'>Order Details:</h3>"
	                    + "<p style='margin: 10px 0;'><strong>Order ID:</strong> " + order.getOrderId() + "</p>"
	                    + "<p style='margin: 10px 0;'><strong>Product Name:</strong> " + order.getProductName() + "</p>"
	                    + "<p style='margin: 10px 0;'><strong>Quantity:</strong> " + order.getQuantity() + "</p>"
	                    + "<p style='margin: 10px 0;'><strong>Total Price:</strong> $" + order.getPrice() + "</p>"
	                    + "</div>"
	                    + "<br/>"
	                    + "<p>We will notify you once the order is shipped.</p>"
	                    + "<div style='text-align: center;'>"
	                    + "<img src='" + order.getImage() + "' alt='Product Image' style='max-width: 100%; height: auto; border-radius: 10px; margin-top: 20px;' />"
	                    + "</div>"
	                    + "<br/><br/>"
	                    + "<p style='font-size: 14px; color: #777; text-align: center;'>Best regards,<br/>Your Company Name</p>"
	                    + "</div>"
	                    + "</body></html>";




	            boolean emailSent = emailService.sendHtmlEmail(message, subject, email);
	            if (!emailSent) {
	                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                        .body("Order created, but failed to send confirmation email.");
	            }

	            return ResponseEntity.ok("Order created successfully and confirmation email sent.");

	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                    .body("Failed to create order: " + e.getMessage());
	        }
	    }


	    @GetMapping("/all-order")
	    public ResponseEntity<List<Order>> getAllOrder(){
	    	try {
	    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	        String email = authentication.getName(); 
	        List<Order> orderItems = this.orderService.getAllOrder(email);

	        return ResponseEntity.ok(orderItems);

	    } catch (NoSuchElementException | IllegalArgumentException e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
	    }
	        
	    }
	    
	    
	   
	}



	

