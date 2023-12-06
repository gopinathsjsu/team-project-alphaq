package edu.sjsu.cmpe202.alphaq.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1")
public class HealthController {
	@GetMapping(value = "/health-check", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> reportHealth() {
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
