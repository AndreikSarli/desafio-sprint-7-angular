import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menuAberto = false;
  clicado = false; 

  toggleMenu() {
    // 1. Ativa a animação para o menu deslizar agora
    this.clicado = true;
    
    // 2. Inverte o estado (abre ou fecha)
    this.menuAberto = !this.menuAberto;

    // 3. Após 300ms (quando a animação de abrir/fechar termina),
    // desliga o 'clicado' automaticamente para que a próxima troca de página seja 100% estática
    setTimeout(() => {
      this.clicado = false;
    }, 300);
  }
}