package edu.sjsu.cmpe202.alphaq.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.JsonNode;

import edu.sjsu.cmpe202.alphaq.dto.TransactionHistoryDTO;
import edu.sjsu.cmpe202.alphaq.entity.TransactionHistory;
import edu.sjsu.cmpe202.alphaq.repository.TransactionHistoryRepository;
import edu.sjsu.cmpe202.alphaq.service.BookTicketsPaymentService;

@Service
@Transactional
public class BookTicketsPaymentServiceImpl implements BookTicketsPaymentService {

	@Autowired
	private TransactionHistoryRepository transactionHistoryRepository;

	@Override
	public TransactionHistoryDTO saveTransactionHistory(JsonNode requestBody) {
		TransactionHistory transactionHistory = new TransactionHistory();
		transactionHistory.setEmail(requestBody.get("email").toString());
		transactionHistory.setMovieId(requestBody.get("movieId").toString());
		transactionHistory.setMovieTitle(requestBody.get("movieTitle").toString());
		transactionHistory.setSelectedShowtime(requestBody.get("selectedShowtime").toString());
		transactionHistory.setAmmountPaid(requestBody.get("amountPaid").asDouble());

		TransactionHistory savedTransactionHistory = this.transactionHistoryRepository.save(transactionHistory);

		TransactionHistoryDTO transactionHistoryDTO = new TransactionHistoryDTO();
		transactionHistoryDTO.setId(savedTransactionHistory.getId());
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
			transactionHistoryDTO.setId(transactionHistory.getId());
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
