import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { Router, RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LoginComponent, RouterModule, HttpClientModule, MatGridListModule, MatListModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public location: string | null = "San Jose";
  movieSchedule = [];

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
      this.getMovieSchedule(this.location);
  }

  routeToCreateAccount() {
    this.router.navigateByUrl('/create-account')
  }

  routeToBookTickets() {
    this.router.navigateByUrl('/book-tickets')
  }

  public getMovieSchedule(location: string | null): void {
    let http = this.httpClient.get("http://localhost:8080/movie-schedule/get-schedule/" + this.location).subscribe(response => {
      console.log(response);
      let data: any = response;
      this.movieSchedule = data;
    })
  }
}
