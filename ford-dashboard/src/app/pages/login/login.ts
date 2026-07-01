import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  nome = '';
  senha = '';
  erroMensagem = '';
  lembrarLogin = false;

  constructor(
    private authService: Auth,
    private router: Router,
  ) {}

  ngOnInit() {
    this.verificarAutoLogin();
  }

  /* --- FLUXO DE AUTO-LOGIN --- */
  verificarAutoLogin() {
    const credenciaisArmazenadas = localStorage.getItem('ford-login-auto');
    if (credenciaisArmazenadas) {
      try {
        const { nome, senha } = JSON.parse(credenciaisArmazenadas);
        this.nome = nome;
        this.senha = senha;
        this.lembrarLogin = true;
        this.entrar();
      } catch (e) {
        console.error('Erro ao recuperar credenciais:', e);
        localStorage.removeItem('ford-login-auto');
      }
    }
  }

  /* --- VALIDAÇÃO DE FORMULÁRIO --- */
  formularioValido(): boolean {
    return !!this.nome?.trim() && !!this.senha?.trim();
  }

  /* --- AUTENTICAÇÃO --- */
  entrar() {
    if (!this.formularioValido()) {
      this.erroMensagem = 'Por favor, preencha todos os campos.';
      return;
    }

    this.authService.realizarLogin({ nome: this.nome, senha: this.senha }).subscribe({
      next: (usuarioValido) => {
        this.erroMensagem = '';

        sessionStorage.setItem('usuarioLogado', 'true');

        if (this.lembrarLogin) {
          localStorage.setItem(
            'ford-login-auto',
            JSON.stringify({ nome: this.nome, senha: this.senha }),
          );
        } else {
          localStorage.removeItem('ford-login-auto');
        }

        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log('Erro recebido:', err);
        this.erroMensagem = err.error?.message || 'Servidor indisponível. Tente mais tarde.';
      },
    });
  }
}