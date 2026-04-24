import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyService, Policy } from '../../services/policy.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PolicyCardComponent } from '../../components/policy-card/policy-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, PolicyCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  policies: Policy[] = [];

  constructor(private policyService: PolicyService) {}

  ngOnInit() {
    this.loadPolicies();
  }

  loadPolicies() {
    this.policyService.getAllPolicies().subscribe({
      next: (data) => this.policies = data,
      error: (err) => console.error('Failed to load policies', err)
    });
  }
}