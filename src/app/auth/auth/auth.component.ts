import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponse } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(private auth: AuthService,private router:Router) {}
  isLoggedinMode = true;
  isLoading = false;
  error: string = null;

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoggedinMode = !this.isLoggedinMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponse>;

    this.isLoading = true;

    if (this.isLoggedinMode) {
      authObs = this.auth.signIn(email, password);
    } else {
      authObs = this.auth.signUp(email, password);
    }
    authObs.subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;

        this.isLoading = false;
      }
    );
    form.reset();
  }
}
