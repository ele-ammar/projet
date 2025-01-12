import { Component } from '@angular/core';
import { RelationService } from '../relation.service'; // Assurez-vous que le chemin est correct
import { Router } from '@angular/router'; // Importez Router
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  name: string = '';
  email: string = '';
  datetime: string = '';
  destination: string = '';
  message: string = '';

  constructor(private bookingService: RelationService, private router: Router) {}

  bookTour(): void {
    if (this.name && this.email && this.datetime && this.destination) {
      this.bookingService.bookTour(this.name, this.email, this.datetime, this.destination, this.message)
        .subscribe({
          next: (response) => {
            console.log('Booking confirmed:', response);
            alert('Thank you for booking with us!');
            
          },
          error: (err) => {
            console.error('Booking error:', err);
            alert('Failed to book your tour. Please try again.');
          }
        });
    } else {
      alert('Please fill in all required fields.');
    }
  }

  


}
