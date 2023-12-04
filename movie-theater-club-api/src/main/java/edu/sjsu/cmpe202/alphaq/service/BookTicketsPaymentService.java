package edu.sjsu.cmpe202.alphaq.service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.JsonNode;

import edu.sjsu.cmpe202.alphaq.dto.TransactionHistoryDTO;

@Transactional
public interface BookTicketsPaymentService {
	public TransactionHistoryDTO saveTransactionHistory(JsonNode requestBody);

	public List<TransactionHistoryDTO> getAllTransactionHistory();

	public List<TransactionHistoryDTO> getTransactionHistory(String email);
}
