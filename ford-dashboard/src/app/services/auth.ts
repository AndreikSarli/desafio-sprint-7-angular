import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:3001/login';

  constructor(private http: HttpClient) {}

  realizarLogin(dados: { nome: string; senha: string }): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, dados);
  }
}