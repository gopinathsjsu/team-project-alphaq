import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatTooltipModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent implements OnInit {
  @Input()
  movie: any = {};
  id = "";
  title = "";
  rating = "";
  runTime = "";
  showtime = [];
  description = "";
  posterFileName = "";

  ngOnInit(): void {
    this.id = this.movie["id"];
    this.title = this.movie["title"];
    this.rating = this.movie["rating"];
    this.runTime = this.movie["runTime"];
    this.showtime = this.movie["showtime"];
    this.description = this.movie["description"];
    this.posterFileName = this.movie["posterFileName"];
  }  
}
