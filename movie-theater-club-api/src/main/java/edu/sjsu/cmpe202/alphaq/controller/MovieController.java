package edu.sjsu.cmpe202.alphaq.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.sjsu.cmpe202.alphaq.dto.MovieDTO;
import edu.sjsu.cmpe202.alphaq.service.MovieService;

@RestController
@RequestMapping("/movie")
public class MovieController {
	@Autowired
	private MovieService movieService;

	@GetMapping(value = "/getAllMovies", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<MovieDTO>> getAllMovies() {
		List<MovieDTO> movieList = movieService.getAllMovies();
		
		return new ResponseEntity<>(movieList, HttpStatus.OK);
	}
}
