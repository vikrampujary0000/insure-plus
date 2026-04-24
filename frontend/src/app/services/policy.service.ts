import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

export interface Policy {
  _id?: string;
  name: string;
  premium: number;
  coverage: number;
  duration: number;
  eligibility: string;
  benefits: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private apiUrl = 'http://localhost:5000/api/policies';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  // Public — no auth needed
  getAllPolicies() {
    return this.http.get<Policy[]>(this.apiUrl);
  }

  // Admin only
  addPolicy(policy: Policy) {
    return this.http.post<Policy>(
      this.apiUrl,
      policy,
      { headers: this.getHeaders() }
    );
  }

  updatePolicy(id: string, policy: Policy) {
    return this.http.put<Policy>(
      `${this.apiUrl}/${id}`,
      policy,
      { headers: this.getHeaders() }
    );
  }

  deletePolicy(id: string) {
    return this.http.delete(
      `${this.apiUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }
}