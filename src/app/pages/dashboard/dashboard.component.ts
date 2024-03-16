import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddComponent } from '../../components/modal-add/modal-add.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.modalService.open(ModalAddComponent,  { size: 'xl' })

  }

  entrada: String = "00,00"
  saidas: String = "00,00"
  total: String = "00,00"

  button() {
  }

  // logout

  logout() {
    this.router.parseUrl('/login');
  }
}
