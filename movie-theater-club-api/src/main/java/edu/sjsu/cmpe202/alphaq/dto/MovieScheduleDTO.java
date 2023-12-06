package edu.sjsu.cmpe202.alphaq.dto;

public class MovieScheduleDTO {
	private Integer movieScheduleId;
	private String location;
	private String theaterName;
	private String title;
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
