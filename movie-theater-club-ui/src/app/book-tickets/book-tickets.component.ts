import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MovieCardComponent } from '../cards/movie-card/movie-card.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-book-tickets',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MovieCardComponent, RouterModule, HttpClientModule],
  templateUrl: './book-tickets.component.html',
  styleUrl: './book-tickets.component.css'
})
export class BookTicketsComponent implements OnInit {
  
  movies = []

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getAllMovies();
  }

  public getAllMovies(): void {
    let http = this.httpClient.get(environment.apiUrl + "/movie/getAllMovies").subscribe(response => {
      let data: any = response;
      this.movies = data;
    })
  }
}
