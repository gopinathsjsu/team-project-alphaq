package edu.sjsu.cmpe202.alphaq.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.sjsu.cmpe202.alphaq.entity.Movie;

public interface MovieRepository extends JpaRepository<Movie, Integer> {

}
