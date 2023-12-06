import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent implements OnInit {
  public accountId: string | null = "";
  public email: string | null = "";
  public membership: string | null = "";
  public rewardsPoints = "";
  public transactionHistory = [];
  public transactionHistoryThirtyDays = [];

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.accountId = localStorage.getItem("id");
    this.email = localStorage.getItem("email");
    this.membership = localStorage.getItem("membership");
    this.getRewardsPoints();
    this.getTransactionHistory();
    this.getTransactionHistoryThirtyDays();
  }

  getRewardsPoints(): void {
    let http = this.httpClient.get(environment.apiUrl + "/rewards-points/get/" + this.accountId).subscribe(response => {
      let data: any = response;
      this.rewardsPoints = data["totalPoints"];
    })
  }

  getTransactionHistory(): void {
    let http = this.httpClient.get(environment.apiUrl + "/book-tickets/get-transactions/" + this.email).subscribe(response => {
      let data: any = response;
      this.transactionHistory = data;
    })
  }

  getTransactionHistoryThirtyDays(): void {
    let http = this.httpClient.get(environment.apiUrl + "/book-tickets/get-transactions-last-thirty-days/" + this.email).subscribe(response => {
      let data: any = response;
      this.transactionHistoryThirtyDays = data;
    })
  }
}
