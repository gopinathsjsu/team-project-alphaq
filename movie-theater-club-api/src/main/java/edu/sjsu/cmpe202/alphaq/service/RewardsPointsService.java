package edu.sjsu.cmpe202.alphaq.service;

import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.JsonNode;

import edu.sjsu.cmpe202.alphaq.dto.RewardsPointsDTO;

@Transactional
public interface RewardsPointsService {
	public RewardsPointsDTO saveRewardsPoints(JsonNode requestBody);

	public RewardsPointsDTO getRewardsPoints(Integer id);
}
