package edu.sjsu.cmpe202.alphaq.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "REWARDS_POINTS")
public class RewardsPoints {
	@Id
	private Integer rewardsPointsId;
	@Column(name = "EMAIL")
	private String email;
	@Column(name = "TOTAL_POINTS")
	private Integer totalPoints;
	@MapsId
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "accountId")
	private Account account;

	public Integer getRewardsPointsId() {
		return rewardsPointsId;
	}

	public void setRewardsPointsId(Integer rewardsPointsId) {
		this.rewardsPointsId = rewardsPointsId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Integer getTotalPoints() {
		return totalPoints;
	}

	public void setTotalPoints(Integer totalPoints) {
		this.totalPoints = totalPoints;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}
}
