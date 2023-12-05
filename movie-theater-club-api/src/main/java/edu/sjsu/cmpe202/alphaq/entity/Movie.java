package edu.sjsu.cmpe202.alphaq.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "MOVIE")
public class Movie {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer movieId;
	@Column(name = "TITLE")
	private String title;
	@Column(name = "RATING")
	private String rating;
	@Column(name = "RUN_TIME")
	private String runTime;
	@Column(name = "DESCRIPTION", columnDefinition = "TEXT")
	private String description;
	@Column(name = "SHOWTIME")
	private List<String> showtime;
	@Column(name = "POSTER_FILE_NAME")
	private String posterFileName;
	@ManyToOne
	@JoinColumn(name = "theaterId", nullable = false)
	private Theater theater;

	public Integer getMovieId() {
		return movieId;
	}

	public void setMovieId(Integer movieId) {
		this.movieId = movieId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}

	public String getRunTime() {
		return runTime;
	}

	public void setRunTime(String runTime) {
		this.runTime = runTime;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<String> getShowtime() {
		return showtime;
	}

	public void setShowtime(List<String> showtime) {
		this.showtime = showtime;
	}

	public String getPosterFileName() {
		return posterFileName;
	}

	public void setPosterFileName(String posterFileName) {
		this.posterFileName = posterFileName;
	}

	public Theater getTheater() {
		return theater;
	}

	public void setTheater(Theater theater) {
		this.theater = theater;
	}
}