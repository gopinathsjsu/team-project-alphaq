package edu.sjsu.cmpe202.alphaq.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.sjsu.cmpe202.alphaq.dto.MovieScheduleDTO;
import edu.sjsu.cmpe202.alphaq.entity.MovieSchedule;
import edu.sjsu.cmpe202.alphaq.repository.MovieScheduleRepository;
import edu.sjsu.cmpe202.alphaq.service.MovieScheduleService;

@Service
@Transactional
public class MovieScheduleServiceImpl implements MovieScheduleService {

	@Autowired
	private MovieScheduleRepository movieScheduleRepository;

	@Override
	public List<MovieScheduleDTO> getAllMovieSchedule(String location) {
		List<MovieSchedule> movieScheduleList = movieScheduleRepository.findAllByLocationIs(location);
		List<MovieScheduleDTO> movieScheduleDTOList = new ArrayList<>();

		MovieScheduleDTO movieScheduleDTO = new MovieScheduleDTO();
		for (MovieSchedule movieSchedule : movieScheduleList) {
			movieScheduleDTO = new MovieScheduleDTO();
			movieScheduleDTO.setMovieScheduleId(movieSchedule.getMovieScheduleId());
			movieScheduleDTO.setLocation(movieSchedule.getLocation());
			movieScheduleDTO.setTheaterName(movieSchedule.getTheaterName());
			movieScheduleDTO.setTitle(movieSchedule.getTitle());
			movieScheduleDTO.setShowtime(movieSchedule.getShowtime());

			movieScheduleDTOList.add(movieScheduleDTO);
		}
		return movieScheduleDTOList;
	}
}
