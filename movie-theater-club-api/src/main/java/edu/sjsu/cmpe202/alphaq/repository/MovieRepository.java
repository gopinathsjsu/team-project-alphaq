package edu.sjsu.cmpe202.alphaq.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.sjsu.cmpe202.alphaq.entity.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {

}
