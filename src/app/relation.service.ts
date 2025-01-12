import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RelationService {

  private apiUrl = 'http://localhost:5000'; // URL de votre backend

  constructor(private http: HttpClient) { }

  // Méthode pour l'inscription
  signUp(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { name, email, password });
  }

  // Méthode pour la connexion
  signIn(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, { email, password });
  }

  bookTour(
    name: string,
    email: string,
    datetime: string,
    destination: string,
    message?: string
  ): Observable<any> {
    const bookingData = { name, email, datetime, destination, message };
    return this.http.post(`${this.apiUrl}/api/book`, bookingData);
  }

  


}
