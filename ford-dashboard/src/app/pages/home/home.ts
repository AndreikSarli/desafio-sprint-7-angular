import { Component, OnInit, HostListener } from '@angular/core'; // 👈 Importamos o HostListener
import { Router } from '@angular/router';
import { MenuService } from "../../services/menu.service";

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit { 
  
  // 👤 Variável de controle do menu suspenso do usuário na Home
  mostrarDropdown = false; 

  constructor(
    private router: Router,
    public menuService: MenuService
  ) {}

  ngOnInit() {
    // Sua lógica do ngOnInit (vazia por enquanto)
  }

  // 👤 Abre e fecha o dropdown ao clicar no ícone do bonequinho
  toggleDropdown(event: Event) {
    event.stopPropagation(); // Impede que o clique feche o menu no mesmo instante
    this.mostrarDropdown = !this.mostrarDropdown;
  }

  // 👤 Fecha o menu automaticamente se houver clique em qualquer outro lugar da Home
  @HostListener('document:click')
  cliqueFora() {
    this.mostrarDropdown = false;
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}