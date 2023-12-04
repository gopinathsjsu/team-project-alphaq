package edu.sjsu.cmpe202.alphaq.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.JsonNode;

import edu.sjsu.cmpe202.alphaq.dto.TransactionHistoryDTO;
import edu.sjsu.cmpe202.alphaq.entity.Account;
import edu.sjsu.cmpe202.alphaq.entity.RewardsPoints;
import edu.sjsu.cmpe202.alphaq.entity.TransactionHistory;
import edu.sjsu.cmpe202.alphaq.repository.AccountRepository;
import edu.sjsu.cmpe202.alphaq.repository.RewardsPointsRepository;
import edu.sjsu.cmpe202.alphaq.repository.TransactionHistoryRepository;
import edu.sjsu.cmpe202.alphaq.service.BookTicketsPaymentService;

@Service
@Transactional
public class BookTicketsPaymentServiceImpl implements BookTicketsPaymentService {

	@Autowired
	private TransactionHistoryRepository transactionHistoryRepository;
	@Autowired
	private RewardsPointsRepository rewardsPointsRepository;
	@Autowired
	private AccountRepository accountRepository;

	@Override
	public TransactionHistoryDTO saveTransactionHistory(JsonNode requestBody) {
		TransactionHistory transactionHistory = new TransactionHistory();
		transactionHistory.setEmail(requestBody.get("email").asText());
		transactionHistory.setMovieId(requestBody.get("movieId").asText());
		transactionHistory.setMovieTitle(requestBody.get("movieTitle").asText());
		transactionHistory.setSelectedShowtime(requestBody.get("selectedShowtime").asText());
		transactionHistory.setAmmountPaid(requestBody.get("amountPaid").asDouble());

		TransactionHistory savedTransactionHistory = this.transactionHistoryRepository.save(transactionHistory);

		// Rewards Points Calculation
		String email = requestBody.get("email").asText();
		Optional<RewardsPoints> rewardsPointsPacked = rewardsPointsRepository.findByEmailIgnoreCase(email);
		Optional<Account> accountPacked = accountRepository.findByEmail(email);
		if (accountPacked.isPresent()) {
			Account account = accountPacked.get();
			RewardsPoints rewardsPoints = new RewardsPoints();
			if (rewardsPointsPacked.isPresent()) {
				rewardsPoints = rewardsPointsPacked.get();
				rewardsPoints.setAccount(account);
				rewardsPoints.setEmail(account.getEmail());
				rewardsPoints.setTotalPoints(rewardsPoints.getTotalPoints() + 
						((int) Math.round(requestBody.get("amountPaid").asDouble()) * 1));
			} else {
				rewardsPoints.setAccount(account);
				rewardsPoints.setEmail(account.getEmail());
				rewardsPoints.setTotalPoints((int) Math.round(requestBody.get("amountPaid").asDouble()) * 1);
			}
			rewardsPointsRepository.save(rewardsPoints);
		}

		TransactionHistoryDTO transactionHistoryDTO = new TransactionHistoryDTO();
		transactionHistoryDTO.setId(savedTransactionHistory.getTransactionHistoryId());
		transactionHistoryDTO.setEmail(savedTransactionHistory.getEmail());
		transactionHistoryDTO.setMovieId(savedTransactionHistory.getMovieId());
		transactionHistoryDTO.setMovieTitle(savedTransactionHistory.getMovieTitle());
		transactionHistoryDTO.setSelectedShowtime(savedTransactionHistory.getSelectedShowtime());
		transactionHistoryDTO.setAmmountPaid(savedTransactionHistory.getAmmountPaid());

		return transactionHistoryDTO;
	}

	@Override
	public List<TransactionHistoryDTO> getAllTransactionHistory() {
		List<TransactionHistory> transactionHistoryList = transactionHistoryRepository.findAll();
		List<TransactionHistoryDTO> transactionHistoryDTOList = new ArrayList<>();

		TransactionHistoryDTO transactionHistoryDTO = new TransactionHistoryDTO();
		for (TransactionHistory transactionHistory : transactionHistoryList) {
			transactionHistoryDTO = new TransactionHistoryDTO();
			transactionHistoryDTO.setId(transactionHistory.getTransactionHistoryId());
			transactionHistoryDTO.setEmail(transactionHistory.getEmail());
			transactionHistoryDTO.setMovieId(transactionHistory.getMovieId());
			transactionHistoryDTO.setMovieTitle(transactionHistory.getMovieTitle());
			transactionHistoryDTO.setSelectedShowtime(transactionHistory.getSelectedShowtime());
			transactionHistoryDTO.setAmmountPaid(transactionHistory.getAmmountPaid());
			transactionHistoryDTOList.add(transactionHistoryDTO);
		}

		return transactionHistoryDTOList;
	}

	@Override
	public List<TransactionHistoryDTO> getTransactionHistory(String email) {
		List<TransactionHistory> transactionHistoryList = this.transactionHistoryRepository.findAllByEmailIgnoreCase(email);
		List<TransactionHistoryDTO> transactionHistoryDTOList = new ArrayList<>();
		
		TransactionHistoryDTO transactionHistoryDTO = new TransactionHistoryDTO();
		for (TransactionHistory transactionHistory : transactionHistoryList) {
			transactionHistoryDTO = new TransactionHistoryDTO();
			transactionHistoryDTO.setId(transactionHistory.getTransactionHistoryId());
			transactionHistoryDTO.setEmail(transactionHistory.getEmail());
			transactionHistoryDTO.setMovieId(transactionHistory.getMovieId());
			transactionHistoryDTO.setMovieTitle(transactionHistory.getMovieTitle());
			transactionHistoryDTO.setSelectedShowtime(transactionHistory.getSelectedShowtime());
			transactionHistoryDTO.setAmmountPaid(transactionHistory.getAmmountPaid());
			transactionHistoryDTOList.add(transactionHistoryDTO);
		}

		return transactionHistoryDTOList;
	}
}
