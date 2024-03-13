import { Component } from '@angular/core';
import {Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(
    private router: Router
  ){}

  entrada: String = "00,00"
  saidas: String = "00,00"
  total: String = "00,00"

  button(){
    this.entrada = "1500"
  }




  // logout

  logout(){
    this.router.parseUrl('/login');
  }
}
