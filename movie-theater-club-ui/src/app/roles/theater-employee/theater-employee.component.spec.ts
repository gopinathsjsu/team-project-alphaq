import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterEmployeeComponent } from './theater-employee.component';

describe('TheaterEmployeeComponent', () => {
  let component: TheaterEmployeeComponent;
  let fixture: ComponentFixture<TheaterEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheaterEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TheaterEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
