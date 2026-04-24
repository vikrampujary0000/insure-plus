import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Policy } from '../../services/policy.service';

@Component({
  selector: 'app-policy-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './policy-card.component.html',
  styleUrl: './policy-card.component.css'
})
export class PolicyCardComponent {
  @Input() policy!: Policy;
  @Input() isAdmin = false;

  @Output() editPolicy = new EventEmitter<Policy>();
  @Output() deletePolicy = new EventEmitter<string>();

  onEdit() {
    this.editPolicy.emit(this.policy);
  }

  onDelete() {
    this.deletePolicy.emit(this.policy._id);
  }
}