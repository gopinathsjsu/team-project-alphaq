package edu.sjsu.cmpe202.alphaq.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "MOVIE_SCHEDULE")
public class MovieSchedule {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer movieScheduleId;
	@Column(name = "LOCATION")
	private String location;
	@Column(name = "THEATER_NAME")
	private String theaterName;
	@Column(name = "TITLE")
	private String title;
	@Column(name = "SHOWTIME")
	private String showtime;

	public Integer getMovieScheduleId() {
		return movieScheduleId;
	}

	public void setMovieScheduleId(Integer movieScheduleId) {
		this.movieScheduleId = movieScheduleId;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getTheaterName() {
		return theaterName;
	}

	public void setTheaterName(String theaterName) {
		this.theaterName = theaterName;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getShowtime() {
		return showtime;
	}

	public void setShowtime(String showtime) {
		this.showtime = showtime;
	}
}
