package edu.sjsu.cmpe202.alphaq.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.sjsu.cmpe202.alphaq.dto.MovieScheduleDTO;
import edu.sjsu.cmpe202.alphaq.service.MovieScheduleService;

@RestController
@RequestMapping("/movie-schedule")
public class MovieScheduleController {
	@Autowired
	private MovieScheduleService movieScheduleService;

	@GetMapping(value = "/get-schedule/{location}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<MovieScheduleDTO>> getSchedule(@PathVariable String location) {
		List<MovieScheduleDTO> movieScheduleDTOList = movieScheduleService.getAllMovieSchedule(location);

		return new ResponseEntity<>(movieScheduleDTOList, HttpStatus.OK);
	}
}
