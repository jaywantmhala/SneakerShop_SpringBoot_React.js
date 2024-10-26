package com.jaywant.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;

import com.jaywant.JWT.JwtUtils;
import com.jaywant.Model.Product;
import com.jaywant.Model.User;
import com.jaywant.Repo.ProductRepo;
import com.jaywant.Repo.UserRepo;

@Service
public class ProductService {

	
	@Autowired
	private ProductRepo productRepo;
	
	
	
	@Autowired
	private UserRepo userRepo;
	
	
	public Product createProduct(Product product, String email) {
		User user = this.userRepo.findByEmail(email);
		product.setUser(user);
		return this.productRepo.save(product);
	}
	
	public List<Product> getAllProduct(){
return this.productRepo.findAll();
	}
	
	public void deleteProduct(int productId, String email) {
	 this.productRepo.deleteById(productId);
	}
}
