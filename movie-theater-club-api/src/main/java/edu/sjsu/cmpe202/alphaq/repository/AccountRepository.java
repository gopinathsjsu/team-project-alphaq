package edu.sjsu.cmpe202.alphaq.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.sjsu.cmpe202.alphaq.entity.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

}
