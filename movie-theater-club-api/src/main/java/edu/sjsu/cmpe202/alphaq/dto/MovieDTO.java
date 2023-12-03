package edu.sjsu.cmpe202.alphaq.dto;

import java.util.List;

public class MovieDTO {
	private Integer id;
	private String title;
	private String rating;
	private String runTime;
	private String description;
	private List<String> showtime;
	private String posterFileName;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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
}
