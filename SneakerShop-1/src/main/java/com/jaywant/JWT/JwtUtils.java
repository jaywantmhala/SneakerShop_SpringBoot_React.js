package com.jaywant.JWT;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts; // Correct import

@Component
public class JwtUtils{
	
//	@Autowired
	private final SecretKey key;
	
	private static final long EXPIRATION_TIME=86400000;
	
	private JwtUtils() {
		String secretString="MynameisJAYWANTMHALA1234567890qwertyuiopasdfghjklzxcvbnm64g4g64fg66wetrh641bv3213f4erg41dw6e5q";
		byte[] keyBytes = Base64.getDecoder().decode(secretString.getBytes(StandardCharsets.UTF_8));
		this.key = new SecretKeySpec(keyBytes,"HmacSHA256");
	}
	
	public String generateToken(UserDetails userDetails) {
	return Jwts.builder().subject(userDetails.getUsername())
			.issuedAt(new Date(System.currentTimeMillis()))
			.expiration(new Date(System.currentTimeMillis()+EXPIRATION_TIME))
			.signWith(key)
			.compact();
	}
	
	public String generateRefreshToken(HashMap<String,Object> claims, UserDetails userDetails) {
		return Jwts.builder()
				.claims(claims)
				.subject(userDetails.getUsername())
				.issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis()+EXPIRATION_TIME))
				.signWith(key)
				.compact();
	}
	
	
	public String extractUsername(String token) {
		return extractClaims(token,Claims::getSubject);
	}

	private <T> T extractClaims(String token, Function<Claims,T> claimsFunction) {
	return 	claimsFunction.apply(Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload());
	}
	
	
	public boolean isTokenValid(String token, UserDetails userDetails) {
		final String username = extractUsername(token);
		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}

	private boolean isTokenExpired(String token) {
		return extractClaims(token,Claims::getExpiration).before(new Date());
	}
}