import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginValid = true;
  public email = "";
  public password = "";

  constructor(private router: Router, private httpClient: HttpClient) { }

  public onSubmit(): void {
    const body = {"email":this.email,"password":this.password};
    let http = this.httpClient.post("http://localhost:8080/account/login", body).subscribe(response => {
      console.log(response);

      let data: any = response;
      if(data["role"] == null)
        this.loginValid = false;

      if(data["role"] == "Member") {
        localStorage.setItem("id", data["id"]);
        localStorage.setItem("email", this.email);
        localStorage.setItem("role", data["role"]);
        localStorage.setItem("membership", data["membership"]);
        this.router.navigateByUrl('/member');
      }
    })
  }
}
