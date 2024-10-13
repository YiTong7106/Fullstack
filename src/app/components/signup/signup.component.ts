import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [FormsModule,CommonModule]
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    this.authService.signup(this.username, this.password, this.confirmPassword).subscribe({
      next: (data) => {
        if (data.status === 'Signup successfully') {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = data.status;
        }
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }
}
