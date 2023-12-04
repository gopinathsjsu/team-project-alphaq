package edu.sjsu.cmpe202.alphaq.service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import edu.sjsu.cmpe202.alphaq.dto.MovieScheduleDTO;

@Transactional
public interface MovieScheduleService {
	public List<MovieScheduleDTO> getAllMovieSchedule(String location);
}
