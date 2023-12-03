package edu.sjsu.cmpe202.alphaq.dto;

public class TransactionHistoryDTO {
	private Integer id;
	private String email;
	private String selectedShowtime;
	private String movieId;
	private String movieTitle;
	private Double ammountPaid;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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
