package edu.sjsu.cmpe202.alphaq.service;

import org.springframework.transaction.annotation.Transactional;

import edu.sjsu.cmpe202.alphaq.dto.AccountDTO;

@Transactional
public interface AccountService {
	public AccountDTO createAccount(AccountDTO account);
	public AccountDTO login(AccountDTO account);
}
