package com.jaywant.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jaywant.Model.Order;
import com.jaywant.Model.User;


@Repository
public interface UserRepo extends JpaRepository<User, Integer>{

	public User findByEmail(String email);
    boolean existsByEmail(String email);

}
