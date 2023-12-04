package edu.sjsu.cmpe202.alphaq.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;

import edu.sjsu.cmpe202.alphaq.dto.RewardsPointsDTO;
import edu.sjsu.cmpe202.alphaq.service.RewardsPointsService;

@RestController
@RequestMapping("/rewards-points")
public class RewardsPointsController {
	@Autowired
	RewardsPointsService rewardsPointsService;

	@PostMapping(value = "/save", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RewardsPointsDTO> saveRewardsPoints(@RequestBody JsonNode requestBody) {
		RewardsPointsDTO rewardsPoints = rewardsPointsService.saveRewardsPoints(requestBody);

		return new ResponseEntity<>(rewardsPoints, HttpStatus.OK);
	}

	@GetMapping(value = "/get/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RewardsPointsDTO> getRewardsPoints(@PathVariable String id) {
		RewardsPointsDTO rewardsPoints = rewardsPointsService.getRewardsPoints(Integer.valueOf(id));

		return new ResponseEntity<>(rewardsPoints, HttpStatus.OK);
	}
}
