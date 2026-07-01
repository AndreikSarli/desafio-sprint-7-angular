import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  /* --- VERIFICAÇÃO DE CREDENCIAIS --- */
  const estaLogado = sessionStorage.getItem('usuarioLogado');
  const temAutoLogin = localStorage.getItem('ford-login-auto');

  if (estaLogado === 'true' || temAutoLogin) {
    return true; 
  }

  /* --- REDIRECIONAMENTO COMPORTAMENTAL --- */
  router.navigate(['/']);
  return false;
};