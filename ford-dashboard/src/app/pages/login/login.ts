import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  nome = '';
  senha = '';

  entrar() {
    console.log('Usuário:', this.nome);
    console.log('Senha:', this.senha);
  }
}