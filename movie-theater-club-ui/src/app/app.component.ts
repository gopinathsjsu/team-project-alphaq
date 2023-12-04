import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MatListModule } from '@angular/material/list';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, HeaderComponent, MatSidenavModule, MatListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  
  title = 'movie-theater-club-ui';

  constructor(private router: Router) { }

  toggleMenu(value: string) {
    this.drawer.toggle();
  }

  routeTo(page: string): void {
    this.router.navigateByUrl('/' + page);
  }
}
