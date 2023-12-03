import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { Router, RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LoginComponent, RouterModule, MatGridListModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) { }

  routeToCreateAccount() {
    this.router.navigateByUrl('/create-account')
  }

  routeToBookTickets() {
    this.router.navigateByUrl('/book-tickets')
  }
}
