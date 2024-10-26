package com.jaywant.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.jaywant.Model.User;
import com.jaywant.Repo.UserRepo;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{

	
	@Autowired
	private UserRepo userRepo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepo.findByEmail(username);

        if (user != null) {
            return user;
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
	}

}
