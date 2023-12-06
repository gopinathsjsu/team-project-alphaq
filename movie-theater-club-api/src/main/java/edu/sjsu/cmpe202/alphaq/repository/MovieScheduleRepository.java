package edu.sjsu.cmpe202.alphaq.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.sjsu.cmpe202.alphaq.entity.MovieSchedule;

@Repository
public interface MovieScheduleRepository extends JpaRepository<MovieSchedule, Integer> {
	public List<MovieSchedule> findAllByLocationIs(String location);
	public List<MovieSchedule> findAllByTheaterNameIs(String theaterName);
}
