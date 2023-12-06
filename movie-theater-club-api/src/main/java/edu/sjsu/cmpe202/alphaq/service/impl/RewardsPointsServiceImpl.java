package edu.sjsu.cmpe202.alphaq.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.JsonNode;

import edu.sjsu.cmpe202.alphaq.dto.RewardsPointsDTO;
import edu.sjsu.cmpe202.alphaq.entity.RewardsPoints;
import edu.sjsu.cmpe202.alphaq.repository.RewardsPointsRepository;
import edu.sjsu.cmpe202.alphaq.service.RewardsPointsService;

@Service
@Transactional
public class RewardsPointsServiceImpl implements RewardsPointsService {

	@Autowired
	RewardsPointsRepository rewardsPointsRepository;

	@Override
	public RewardsPointsDTO saveRewardsPoints(JsonNode requestBody) {
		RewardsPoints rewardsPoints = new RewardsPoints();
		rewardsPoints.setEmail(requestBody.get("email").toString());

		RewardsPoints savedRewardsPoints = new RewardsPoints();
		Optional<RewardsPoints> currentPoints = rewardsPointsRepository
				.findByEmailIgnoreCase(requestBody.get("email").toString());
		if (currentPoints.isPresent()) {
			rewardsPoints.setTotalPoints(currentPoints.get().getTotalPoints() + requestBody.get("rewardsPoints").asInt());
			savedRewardsPoints = rewardsPointsRepository.save(rewardsPoints);
		} else {
			rewardsPoints.setTotalPoints(requestBody.get("rewardsPoints").asInt());
			savedRewardsPoints = rewardsPointsRepository.save(rewardsPoints);
		}

		RewardsPointsDTO rewardsPointsDTO = new RewardsPointsDTO();
		rewardsPointsDTO.setId(savedRewardsPoints.getRewardsPointsId());
		rewardsPointsDTO.setEmail(savedRewardsPoints.getEmail());
		rewardsPointsDTO.setTotalPoints(savedRewardsPoints.getTotalPoints());

		return rewardsPointsDTO;
	}

	@Override
	public RewardsPointsDTO getRewardsPoints(Integer id) {
		Optional<RewardsPoints> rewardsPointsPacked = rewardsPointsRepository.findById(id);

		RewardsPoints rewardsPoints = new RewardsPoints();
		if (rewardsPointsPacked.isPresent())
			rewardsPoints = rewardsPointsPacked.get();

		RewardsPointsDTO rewardsPointsDTO = new RewardsPointsDTO();
		rewardsPointsDTO.setId(rewardsPoints.getRewardsPointsId());
		rewardsPointsDTO.setEmail(rewardsPoints.getEmail());
		rewardsPointsDTO.setTotalPoints(rewardsPoints.getTotalPoints());

		return rewardsPointsDTO;
	}
}
