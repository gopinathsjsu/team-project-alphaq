import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-book-tickets-payment',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, FormsModule, RouterModule, HttpClientModule, MatFormFieldModule, MatInputModule, MatSelectModule],
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
  public ticketQuantity = 1;
  public pricePerTicket = 20.00;
  public onlineServiceFee = 1.50;
  public totalPrice = (this.membership == 'Premium' ? this.pricePerTicket : this.pricePerTicket + this.onlineServiceFee);

  constructor(private route: ActivatedRoute, private router: Router, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.queryParamMap.get('movieId');
    this.movieTitle = this.route.snapshot.queryParamMap.get('movieTitle');
    this.selectedShowtime = this.route.snapshot.queryParamMap.get('selectedShowtime');
    console.log(this.selectedShowtime);

    this.membership = localStorage.getItem('membership')
  }

  updateTotalPrice(): void {
    if (localStorage.getItem("membership") == "Premium")
      this.totalPrice = this.pricePerTicket * this.ticketQuantity;
    else
      this.totalPrice = (this.pricePerTicket * this.ticketQuantity) + this.onlineServiceFee;
  }

  onSubmit(): void {
    this.processPayment();
  }

  processPayment():void {
    if (localStorage.getItem("email") != null)
      this.email = localStorage.getItem("email");

    const body = {"email":this.email,"selectedShowtime":this.selectedShowtime,"movieId":this.movieId,"movieTitle":this.movieTitle,"ticketQuantity":this.ticketQuantity,"amountPaid":this.totalPrice};
    let http = this.httpClient.post(environment.apiUrl + "/book-tickets/payment", body).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/member');
    })
  }
}
