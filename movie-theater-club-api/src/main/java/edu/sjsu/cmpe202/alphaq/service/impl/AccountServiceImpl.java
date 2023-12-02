package edu.sjsu.cmpe202.alphaq.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.sjsu.cmpe202.alphaq.dto.AccountDTO;
import edu.sjsu.cmpe202.alphaq.entity.Account;
import edu.sjsu.cmpe202.alphaq.repository.AccountRepository;
import edu.sjsu.cmpe202.alphaq.service.AccountService;

@Service
@Transactional
public class AccountServiceImpl implements AccountService {
	
	@Autowired
	private AccountRepository accountRepository;

	@Override
	public AccountDTO createAccount(AccountDTO accountDTO) {
		Account account = new Account();
		account.setEmail(accountDTO.getEmail());
		account.setPassword(accountDTO.getPassword());
		account.setMembership(accountDTO.getMembership());
		
		account.setRole("Member");
		Account savedAccount = this.accountRepository.save(account);
		
		AccountDTO returnedAccount = new AccountDTO();
		returnedAccount.setEmail(savedAccount.getEmail());
		returnedAccount.setMembership(savedAccount.getMembership());
		returnedAccount.setRole(savedAccount.getRole());
		
		return returnedAccount;
	}

	@Override
	public AccountDTO login(AccountDTO account) {
		// TODO Auto-generated method stub
		return null;
	}
}
