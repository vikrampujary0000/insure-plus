import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { AdminLoginComponent } from '../admin-login/admin-login.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, AdminLoginComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  showLoginModal = false;

  constructor(public authService: AuthService) {}

  openLogin() {
    this.showLoginModal = true;
  }

  onLoginClose() {
    this.showLoginModal = false;
  }
}