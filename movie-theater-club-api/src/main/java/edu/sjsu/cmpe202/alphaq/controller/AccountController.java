package edu.sjsu.cmpe202.alphaq.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import edu.sjsu.cmpe202.alphaq.dto.AccountDTO;
import edu.sjsu.cmpe202.alphaq.service.AccountService;

@RestController
@RequestMapping("/account")
public class AccountController {
	@Autowired
	private AccountService accountService;

	@PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> createAccount(@RequestBody JsonNode requestBody) {
		AccountDTO createdAccount = createAccountProcess(requestBody);

		ObjectNode errorMessage = new ObjectMapper().createObjectNode();
		errorMessage.put("message", "Error Creating Account");

		if (createdAccount != null)
			return new ResponseEntity<>(createdAccount, HttpStatus.OK);
		else
			return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	private AccountDTO createAccountProcess(JsonNode requestBody) {
		AccountDTO account = new AccountDTO();
		account.setEmail(requestBody.get("email").asText());
		account.setPassword(requestBody.get("password").asText());
		account.setMembership(requestBody.get("membership").asText());

		return accountService.createAccount(account);
	}

	@PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> login(@RequestBody JsonNode requestBody) {
		AccountDTO loginAccount = loginAccountProcess(requestBody);

		ObjectNode errorMessage = new ObjectMapper().createObjectNode();
		errorMessage.put("message", "Error Verifying Account");

		if (loginAccount != null)
			return new ResponseEntity<>(loginAccount, HttpStatus.OK);
		else
			return new ResponseEntity<>(errorMessage, HttpStatus.UNAUTHORIZED);
	}

	private AccountDTO loginAccountProcess(JsonNode requestBody) {
		AccountDTO account = new AccountDTO();
		account.setEmail(requestBody.get("email").asText());
		account.setPassword(requestBody.get("password").asText());

		return accountService.login(account);
	}
}
