import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-tickets-payment',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, FormsModule, HttpClientModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './book-tickets-payment.component.html',
  styleUrl: './book-tickets-payment.component.css'
})
export class BookTicketsPaymentComponent implements OnInit {
  public errorMessage = true;
  public firstName = "";
  public lastName = "";
  public email: string | null = "";
  public creditCardNumber = "";
  public membership: string | null = "";

  public movieId: string | null = "";
  public movieTitle: string | null = "";
  public selectedShowtime: string | null = "";
  public ticketQuantity: string | null = "1";
  public pricePerTicket = 20.00;
  public onlineServiceFee = 1.50;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.queryParamMap.get('movieId');
    this.movieTitle = this.route.snapshot.queryParamMap.get('movieTitle');
    this.selectedShowtime = this.route.snapshot.queryParamMap.get('selectedShowtime');
    console.log(this.selectedShowtime);

    this.membership = localStorage.getItem('membership')
  }

  onSubmit(): void {
    this.processPayment();
  }

  processPayment():void {
    let amountPaid = 0;
    if (localStorage.getItem("email") != null)
      this.email = localStorage.getItem("email");
    if (localStorage.getItem("membership") == "Premium")
      amountPaid = this.pricePerTicket;
    else
      amountPaid = this.pricePerTicket + this.onlineServiceFee;

    const body = {"email":this.email,"selectedShowtime":this.selectedShowtime,"movieId":this.movieId,"movieTitle":this.movieTitle,"amountPaid":amountPaid};
    let http = this.httpClient.post("http://localhost:8080/book-tickets/payment", body).subscribe(response => {
      console.log(response);
    })
  }
}
