import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  entradas: { descricao: string, valor: number, tipo: string }[] = [];

  constructor(private http: HttpClient) { }

  atualizarEntradas(): void {
    this.http.get<any[]>('https://backend-my-financeiro.up.railway.app/entradas')
      .subscribe(data => {
        this.entradas = data;
      });
  }
}
