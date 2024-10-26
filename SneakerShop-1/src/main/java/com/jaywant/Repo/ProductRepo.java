package com.jaywant.Repo;


import org.springframework.data.jpa.repository.JpaRepository;

import com.jaywant.Model.Product;

public interface ProductRepo extends JpaRepository<Product, Integer>{



}
