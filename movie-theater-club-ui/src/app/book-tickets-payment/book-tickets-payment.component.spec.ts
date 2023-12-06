import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTicketsPaymentComponent } from './book-tickets-payment.component';

describe('BookTicketsPaymentComponent', () => {
  let component: BookTicketsPaymentComponent;
  let fixture: ComponentFixture<BookTicketsPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookTicketsPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookTicketsPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
