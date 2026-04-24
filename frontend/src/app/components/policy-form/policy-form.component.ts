import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Policy } from '../../services/policy.service';

@Component({
  selector: 'app-policy-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './policy-form.component.html',
  styleUrl: './policy-form.component.css'
})
export class PolicyFormComponent implements OnInit {
  // If policy is passed in, we are in Edit mode
  @Input() policy: Policy | null = null;

  @Output() save = new EventEmitter<Policy>();
  @Output() cancel = new EventEmitter<void>();

  // Local form model
  formData: Policy = {
    name: '',
    premium: 0,
    coverage: 0,
    duration: 0,
    eligibility: '',
    benefits: []
  };

  // Benefits handled as a comma separated string in the input
  benefitsInput = '';
  isEditMode = false;

  ngOnInit() {
    if (this.policy) {
      this.isEditMode = true;
      // Pre-fill form with existing policy data
      this.formData = { ...this.policy };
      this.benefitsInput = this.policy.benefits.join(', ');
    }
  }

  onSave() {
    // Convert comma separated string back to array
    this.formData.benefits = this.benefitsInput
      .split(',')
      .map(b => b.trim())
      .filter(b => b.length > 0);

    // Auto-calculate coverage: premium × duration × 10
    this.formData.coverage = this.formData.premium * this.formData.duration * 10;

    this.save.emit(this.formData);
  }

  onCancel() {
    this.cancel.emit();
  }
}