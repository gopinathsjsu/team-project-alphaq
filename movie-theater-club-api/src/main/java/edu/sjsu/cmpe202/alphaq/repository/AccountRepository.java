package edu.sjsu.cmpe202.alphaq.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.sjsu.cmpe202.alphaq.entity.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
	public Optional<Account> findByEmailAndPassword(String email, String password);

	public Optional<Account> findByEmail(String email);

}
