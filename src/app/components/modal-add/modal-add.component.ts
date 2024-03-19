import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedDataService } from '../../services/shared-data.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-modal-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.scss']
})
export class ModalAddComponent implements OnInit {
  descricao: string = '';
  valor: number = 0;
  tipo: string = 'Entrada';

  constructor(
    public activeModal: NgbActiveModal,
    private sharedDataService: SharedDataService,
    private http: HttpClient
  ) { }

  ngOnInit(): void { }


  cancelar() {
    this.activeModal.close()
  }

  confirmar(): void {
    this.http.post('https://backend-my-financeiro.up.railway.app/adicionar-entrada', { descricao: this.descricao, valor: this.valor, tipo: this.tipo })
      .subscribe(response => {
        // Atualiza a lista de entradas no serviço compartilhado
        this.sharedDataService.atualizarEntradas();
      });

    this.activeModal.close()

  }


}
