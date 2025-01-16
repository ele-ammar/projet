import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarteService {

  private apiUrl = 'http://localhost:5000/api/hotels'; // URL de votre API backend

  constructor(private http: HttpClient) { }

  addHotel(hotel: any): Observable<any> {
    return this.http.post(this.apiUrl, hotel);
  }
}
