package edu.sjsu.cmpe202.alphaq.controller;

import java.util.List;

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

import edu.sjsu.cmpe202.alphaq.dto.TransactionHistoryDTO;
import edu.sjsu.cmpe202.alphaq.service.BookTicketsPaymentService;

@RestController
@RequestMapping("/book-tickets")
public class BookTicketsController {
	@Autowired
	private BookTicketsPaymentService bookTicketsPaymentService;

	@PostMapping(value = "/payment", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<TransactionHistoryDTO> bookTicketsAndProcessPayment(@RequestBody JsonNode requestBody) {
		TransactionHistoryDTO transactionHistoryList = bookTicketsPaymentService.saveTransactionHistory(requestBody);

		return new ResponseEntity<>(transactionHistoryList, HttpStatus.OK);
	}
	
	@GetMapping(value = "/payment", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<TransactionHistoryDTO>> getAllTransactionHistory() {
		List<TransactionHistoryDTO> transactionHistoryList = bookTicketsPaymentService.getAllTransactionHistory();

		return new ResponseEntity<>(transactionHistoryList, HttpStatus.OK);
	}
	
	@GetMapping(value = "/get-transactions/{email}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<TransactionHistoryDTO>> getTransactionHistory(@PathVariable String email) {
		List<TransactionHistoryDTO> transactionHistoryList = bookTicketsPaymentService.getTransactionHistory(email);

		return new ResponseEntity<>(transactionHistoryList, HttpStatus.OK);
	}
}
