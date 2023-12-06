package edu.sjsu.cmpe202.alphaq.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.sjsu.cmpe202.alphaq.entity.RewardsPoints;

@Repository
public interface RewardsPointsRepository extends JpaRepository<RewardsPoints, Integer> {
	public Optional<RewardsPoints> findByEmailIgnoreCase(String email);
}
