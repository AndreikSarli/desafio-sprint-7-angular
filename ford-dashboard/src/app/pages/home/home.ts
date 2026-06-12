import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  // Controla se o menu hambúrguer está aberto ou fechado
  menuAberto = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  logout() {
    // Insira sua lógica de logout aqui (ex: limpar localStorage)
    this.router.navigate(['/login']);
  }
}