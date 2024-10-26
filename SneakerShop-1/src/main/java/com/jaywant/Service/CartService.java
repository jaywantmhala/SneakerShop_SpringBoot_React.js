package com.jaywant.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jaywant.Model.Cart;
import com.jaywant.Model.Product;
import com.jaywant.Model.User;
import com.jaywant.Repo.CartRepo;
import com.jaywant.Repo.ProductRepo;
import com.jaywant.Repo.UserRepo;

@Service
public class CartService {

	
	@Autowired
	private CartRepo cartRepo;
	
	@Autowired
	private ProductRepo productRepo;
	
	@Autowired
	private UserRepo userRepo;
	
	
	 public Cart addCart(Cart cart, int productId, String email) {
		 Product product = productRepo.findById(productId)
			        .orElseThrow(() -> new NoSuchElementException("Product not found"));
			    User user = userRepo.findByEmail(email);

			    cart.setProduct(product); 
			    cart.setProductName(product.getProductName());
			    cart.setPrice(product.getPrice());
			    cart.setImage(product.getUrl()); 

			    cart.setUser(user); 

			    return cartRepo.save(cart);

	    }
	 
	 public Cart updateCart(int cartId, String email, int newQuantity) {
		    User user = userRepo.findByEmail(email);

		    Cart cart = cartRepo.findById(cartId).orElseThrow(() -> new NoSuchElementException("Cart not found"));
		    cart.setQuantity(newQuantity); 
		    return cartRepo.save(cart); 
		}

		
	 public List<Cart> getAllCartItem(String email){
		    User user = userRepo.findByEmail(email);
		    if(user != null) {
		    	return this.cartRepo.findAll().stream().filter(cart->cart.getUser().equals(user)).collect(Collectors.toList());
		    }
			return null;

	 }
		
		 
	 
	 public Cart getCartById(int id, String email) {
		    User user = userRepo.findByEmail(email);
		    Cart cart = this.cartRepo.findById(id).orElse(null);
		    return cart;

		}
	 
	 public void deleteCartById(String email, int id) {
		    User user = userRepo.findByEmail(email);
this.cartRepo.deleteById(id);
	 }
	 
	 }
	 
	 
	 
