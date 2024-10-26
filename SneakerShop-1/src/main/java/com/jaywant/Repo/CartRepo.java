package com.jaywant.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jaywant.Model.Cart;

public interface CartRepo extends JpaRepository<Cart, Integer>{

}
