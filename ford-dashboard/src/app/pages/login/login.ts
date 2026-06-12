import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  nome = '';
  senha = '';
  erroMensagem = '';

  constructor(private authService: Auth, private router: Router) {}

  entrar() {
    if (!this.nome || !this.senha) {
      this.erroMensagem = 'Por favor, preencha todos os campos.';
      return;
    }

    this.authService.realizarLogin({ nome: this.nome, senha: this.senha }).subscribe({
      next: (usuarioValido) => {
        this.erroMensagem = '';
        this.router.navigate(['/home']);
      },
      error: (err) => {
        if (err.status === 401 || err.status === 400) {
          this.erroMensagem = err.error.message || 'Usuário ou senha incorretos.';
        } else {
          this.erroMensagem = 'Não foi possível conectar à API. Certifique-se de que ela está rodando na porta 3001.';
        }
      }
    });
  }
}