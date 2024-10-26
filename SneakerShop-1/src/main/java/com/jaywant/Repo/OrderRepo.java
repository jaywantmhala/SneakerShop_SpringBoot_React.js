package com.jaywant.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jaywant.Model.Order;

public interface OrderRepo extends JpaRepository<Order, Integer>{

}
