package edu.sjsu.cmpe202.alphaq.service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import edu.sjsu.cmpe202.alphaq.dto.MovieDTO;

@Transactional
public interface MovieService {
	public List<MovieDTO> getAllMovies();
}
