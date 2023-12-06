import { Component, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../../angular-material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import Chart from 'chart.js/auto';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'CANDY CANE LANE (2023)', weight: 20.00, symbol: '2:40p, 5:05p, 6:30p, 9:00p'},
  {position: 2, name: 'GODZILLA MINUS ONE (2023)', weight: 20.00, symbol: '12:45p, 4:00p, 7:15p, 10:35p'},
  {position: 3, name: 'MAESTRO (2023)', weight: 20.00, symbol: '11:50a, 2:35p, 7:40p'},
  {position: 4, name: 'NAPOLEON (2023)', weight: 20.00, symbol: '12:40p, 4:55p, 8:30p'},
  {position: 5, name: 'PAW PATROL: THE MIGHTY MOVIE (2023)', weight: 20.00, symbol: '12:45p, 3:00p, 7:00p'},
  {position: 6, name: 'SAM BAHADUR (2023)', weight: 20.00, symbol: '3:45p, 6:40p, 9:30p'},
  {position: 7, name: 'SPIRITED AWAY - STUDIO GHIBLI FEST 2023', weight: 20.00, symbol: '3:50p, 7:30p, 10:10p'},
  {position: 8, name: 'TIGER 3 (2023)', weight: 20.00, symbol: '2:10p, 9:00p'},
  {position: 9, name: 'WISH (2023)', weight: 20.00, symbol: '2:25p, 4:15p, 6:50p, 9:25p'},
];


@Component({
  selector: 'app-theater-employee',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, FormsModule, HttpClientModule, RouterModule, 
    MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatCheckboxModule, JsonPipe, MatTableModule],
  templateUrl: './theater-employee.component.html',
  styleUrl: './theater-employee.component.css'
})
export class TheaterEmployeeComponent implements OnInit {

  seats = this._formBuilder.group({
    seat1: false, seat2: false, seat3: false,
    seat4: false, seat5: false, seat6: false,
    seat7: false, seat8: false, seat9: false,
    seat10: false, seat11: false, seat12: false,
    seat13: false, seat14: false, seat15: false,
    seat16: false, seat17: false, seat18: false,
    seat19: false, seat20: false, seat21: false,
  });

  discounts = this._formBuilder.group({
    showsBeforeSixPm: false,
    tuesdayShows: false,
  });

  title = 'ng-chart';
  chartThirtyDaysByLocation: any = [];
  chartSixtyDaysByLocation: any = [];
  chartNinetyDaysByLocation: any = [];
  ctxThirtyDaysByLocation: any = 'canvasThirtyDaysByLocation';
  ctxSixtyDaysByLocation: any = 'canvasSixtyDaysByLocation';
  ctxNinetyDaysByLocation: any = 'canvasNinetyDaysByLocation';
  chartThirtyDaysByMovies: any = [];
  chartSixtyDaysByMovies: any = [];
  chartNinetyDaysByMovies: any = [];
  ctxThirtyDaysByMovies: any = 'canvasThirtyDaysByMovies';
  ctxSixtyDaysByMovies: any = 'canvasSixtyDaysByMovies';
  ctxNinetyDaysByMovies: any = 'canvasNinetyDaysByMovies';

  constructor(private router: Router, private httpClient: HttpClient, private _formBuilder: FormBuilder) {}
  
  ngOnInit(): void {
    this.chartThirtyDaysByLocation = new Chart(this.ctxThirtyDaysByLocation, {
      type: 'bar',
      data: {
        labels: ['San Jose', 'San Francisco'],
        datasets: [
          {
            label: 'Theater occupancy for the last 30 days by Location',
            data: [533, 653],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    this.chartSixtyDaysByLocation = new Chart(this.ctxSixtyDaysByLocation, {
      type: 'bar',
      data: {
        labels: ['San Jose', 'San Francisco'],
        datasets: [
          {
            label: 'Theater occupancy for the last 60 days by Location',
            data: [1031, 1232],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    this.chartNinetyDaysByLocation = new Chart(this.ctxNinetyDaysByLocation, {
      type: 'bar',
      data: {
        labels: ['San Jose', 'San Francisco'],
        datasets: [
          {
            label: 'Theater occupancy for the last 90 days by Location',
            data: [2373, 2464],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    this.chartThirtyDaysByMovies = new Chart(this.ctxThirtyDaysByMovies, {
      type: 'bar',
      data: {
        labels: ['CANDY CANE LANE (2023)', 'GODZILLA MINUS ONE (2023)', 'MAESTRO (2023)',
         'NAPOLEON (2023)', 'PAW PATROL: THE MIGHTY MOVIE (2023)', 'SAM BAHADUR (2023)',
        'SPIRITED AWAY - STUDIO GHIBLI FEST 2023', 'TIGER 3 (2023)', 'WISH (2023)'],
        datasets: [
          {
            label: 'Theater occupancy for the last 30 days by Movies',
            data: [133, 113, 124, 89, 106, 111, 113, 120, 101],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    this.chartSixtyDaysByMovies = new Chart(this.ctxSixtyDaysByMovies, {
      type: 'bar',
      data: {
        labels: ['CANDY CANE LANE (2023)', 'GODZILLA MINUS ONE (2023)', 'MAESTRO (2023)',
        'NAPOLEON (2023)', 'PAW PATROL: THE MIGHTY MOVIE (2023)', 'SAM BAHADUR (2023)',
       'SPIRITED AWAY - STUDIO GHIBLI FEST 2023', 'TIGER 3 (2023)', 'WISH (2023)'],
        datasets: [
          {
            label: 'Theater occupancy for the last 60 days by Movies',
            data: [253, 233, 254, 171, 210, 225, 230, 242, 205],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    this.chartNinetyDaysByMovies = new Chart(this.ctxNinetyDaysByMovies, {
      type: 'bar',
      data: {
        labels: ['CANDY CANE LANE (2023)', 'GODZILLA MINUS ONE (2023)', 'MAESTRO (2023)',
        'NAPOLEON (2023)', 'PAW PATROL: THE MIGHTY MOVIE (2023)', 'SAM BAHADUR (2023)',
       'SPIRITED AWAY - STUDIO GHIBLI FEST 2023', 'TIGER 3 (2023)', 'WISH (2023)'],
        datasets: [
          {
            label: 'Theater occupancy for the last 90 days by Movies',
            data: [510, 113, 134, 271, 141, 272, 135, 442, 505],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
