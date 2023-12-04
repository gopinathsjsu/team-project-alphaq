package edu.sjsu.cmpe202.alphaq.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "TRANSACTION_HISTORY")
public class TransactionHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer transactionHistoryId;
	@Column(name = "EMAIL")
	private String email;
	@Column(name = "SELECTED_SHOWTIME")
	private String selectedShowtime;
	@Column(name = "MOVIE_ID")
	private String movieId;
	@Column(name = "MOVIE_TITLE")
	private String movieTitle;
	@Column(name = "AMOUNT_PAID")
	private Double ammountPaid;

	public Integer getTransactionHistoryId() {
		return transactionHistoryId;
	}

	public void setTransactionHistoryId(Integer transactionHistoryId) {
		this.transactionHistoryId = transactionHistoryId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSelectedShowtime() {
		return selectedShowtime;
	}

	public void setSelectedShowtime(String selectedShowtime) {
		this.selectedShowtime = selectedShowtime;
	}

	public String getMovieId() {
		return movieId;
	}

	public void setMovieId(String movieId) {
		this.movieId = movieId;
	}

	public String getMovieTitle() {
		return movieTitle;
	}

	public void setMovieTitle(String movieTitle) {
		this.movieTitle = movieTitle;
	}

	public Double getAmmountPaid() {
		return ammountPaid;
	}

	public void setAmmountPaid(Double ammountPaid) {
		this.ammountPaid = ammountPaid;
	}
}
