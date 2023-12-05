import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { BookTicketsComponent } from './book-tickets/book-tickets.component';
import { BookTicketsPaymentComponent } from './book-tickets-payment/book-tickets-payment.component';
import { MemberComponent } from './roles/member/member.component';
import { TheaterEmployeeComponent } from './roles/theater-employee/theater-employee.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    { path: 'create-account', component: CreateAccountComponent },
    { path: 'book-tickets', component: BookTicketsComponent },
    { path: 'book-tickets-payment', component: BookTicketsPaymentComponent },
    { path: 'member', component: MemberComponent },
    { path: 'theater-employee', component: TheaterEmployeeComponent }
];
