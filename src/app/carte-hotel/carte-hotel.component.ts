import { Component } from '@angular/core';
import { CarteService } from '../carte.service';
@Component({
  selector: 'app-carte-hotel',
  templateUrl: './carte-hotel.component.html',
  styleUrls: ['./carte-hotel.component.css']
})
export class CarteHotelComponent {
  hotel = {
    nom: '',
    image: '',
    classement: '',
    localisation: '',
    description:'',
    equipement: '',
    prix: '',
    btn_details: ''
  };

  constructor(private carteService: CarteService) {}

  onSubmit() {
    this.carteService.addHotel(this.hotel).subscribe(
      response => {
        alert('Hôtel ajouté avec succès!');
        console.log(response);
      },
      error => {
        alert('Erreur lors de l\'enregistrement de l\'hôtel');
        console.error(error);
      }
    );
  }
}
