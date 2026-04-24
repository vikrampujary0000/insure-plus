import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyService, Policy } from '../../services/policy.service';
import { PolicyCardComponent } from '../../components/policy-card/policy-card.component';
import { PolicyFormComponent } from '../../components/policy-form/policy-form.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, PolicyCardComponent, PolicyFormComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  policies: Policy[] = [];
  showForm = false;
  selectedPolicy: Policy | null = null;

  constructor(
    private policyService: PolicyService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPolicies();
  }

  loadPolicies() {
    this.policyService.getAllPolicies().subscribe({
      next: (data) => this.policies = data,
      error: (err) => console.error('Failed to load policies', err)
    });
  }

  // Opens blank Add form
  openAddForm() {
    this.selectedPolicy = null;
    this.showForm = true;
  }

  // Opens Edit form pre-filled with selected policy
  openEditForm(policy: Policy) {
    this.selectedPolicy = policy;
    this.showForm = true;
  }

  onFormSave(formData: Policy) {
    if (this.selectedPolicy && this.selectedPolicy._id) {
      // Edit mode — call update
      this.policyService
        .updatePolicy(this.selectedPolicy._id, formData)
        .subscribe({
          next: () => {
            this.loadPolicies();
            this.showForm = false;
          },
          error: (err) => console.error('Update failed', err)
        });
    } else {
      // Add mode — call create
      this.policyService.addPolicy(formData).subscribe({
        next: () => {
          this.loadPolicies();
          this.showForm = false;
        },
        error: (err) => console.error('Add failed', err)
      });
    }
  }

  onFormCancel() {
    this.showForm = false;
    this.selectedPolicy = null;
  }

  onDeletePolicy(id: string) {
    this.policyService.deletePolicy(id).subscribe({
      next: () => this.loadPolicies(),
      error: (err) => console.error('Delete failed', err)
    });
  }

  logout() {
    this.authService.logout();
  }
}