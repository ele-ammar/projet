import { Component } from '@angular/core';
import { RelationService } from '../relation.service'; // Assurez-vous que le chemin est correct
import { Router } from '@angular/router'; // Importez Router
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent  {
  isSignUpActive = false; // Gestion du panneau actif
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: RelationService,private router: Router) {}
 
  // Méthode pour basculer sur l'écran d'inscription
  toggleSignUp(): void {
    this.isSignUpActive = true;
    this.signUp();
  }

  // Méthode pour basculer sur l'écran de connexion
  toggleSignIn(): void {
    this.isSignUpActive = false;
    this.signIn();
  }

  // Méthode d'inscription
  signUp(): void {
    if (this.name && this.email && this.password) {
      this.authService.signUp(this.name, this.email, this.password)
        .subscribe({
          next: (response) => {
            console.log('User signed up:', response);
            alert('Account created successfully!');
          },
          error: (err) => {
            console.error('Sign-up error:', err);
            alert('Sign-up failed!');
          }
        });
    } else {
      alert('Please fill in all fields to sign up.');
    }
  }

  // Méthode de connexion
  signIn(): void {
    if (this.email && this.password) {
      this.authService.signIn(this.email, this.password)
        .subscribe({
          next: (response) => {
            console.log('User signed in:', response);
            alert('Welcome back!');
            this.router.navigate(['/home']); // Redirection vers la page d'accueil
           
          },
          error: (err) => {
            console.error('Sign-in error:', err);
            alert('Sign-in failed!');
          }
        });
    } else {
      alert('Please fill in both email and password to sign in.');
    }
    
}}
