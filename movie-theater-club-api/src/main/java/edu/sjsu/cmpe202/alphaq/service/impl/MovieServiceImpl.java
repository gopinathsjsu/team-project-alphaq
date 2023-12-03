package edu.sjsu.cmpe202.alphaq.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.sjsu.cmpe202.alphaq.dto.MovieDTO;
import edu.sjsu.cmpe202.alphaq.entity.Movie;
import edu.sjsu.cmpe202.alphaq.repository.MovieRepository;
import edu.sjsu.cmpe202.alphaq.service.MovieService;

@Service
@Transactional
public class MovieServiceImpl implements MovieService {

	@Autowired
	private MovieRepository movieRepository;

	@Override
	public List<MovieDTO> getAllMovies() {
		List<Movie> movieList = movieRepository.findAll();
		List<MovieDTO> movieDTOList = new ArrayList<>();

		MovieDTO movieDTO = new MovieDTO();
		for (Movie movie : movieList) {
			movieDTO = new MovieDTO();
			movieDTO.setId(movie.getId());
			movieDTO.setTitle(movie.getTitle());
			movieDTO.setRunTime(movie.getRunTime());
			movieDTO.setRating(movie.getRating());
			movieDTO.setDescription(movie.getDescription());
			movieDTO.setShowtime(movie.getShowtime());
			movieDTO.setPosterFileName(movie.getPosterFileName());
			movieDTOList.add(movieDTO);
		}

		return movieDTOList;
	}
}
