import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, FormsModule, HttpClientModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  public errorMessage = true;
  public email = "";
  public password = "";
  public membership = "";
  public creditCardNumber = "";

  constructor(private httpClient: HttpClient) {}

  public onSubmit(): void {
    const body = {"email":this.email,"password":this.password,"membership":this.membership,"creditCardNumber":this.creditCardNumber};
    let http = this.httpClient.post("http://localhost:8080/account/create", body).subscribe(data => {
      console.log(data);
    })
  }
}
