import { Component, OnInit, HostListener } from '@angular/core'; 
import { Router } from '@angular/router';
import { MenuService } from "../../services/menu.service";

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit { 
  
  mostrarDropdown = false; 
  usuarioLogado = 'Admin';

  // Nova variável para controlar a animação elástica do card principal
  deveAnimarCard = false;

  constructor(
    private router: Router,
    public menuService: MenuService
  ) {}

  ngOnInit() {
    // Verifica se o card já realizou o movimento nesta sessão
    const jaAnimou = sessionStorage.getItem('home-card-animado');

    if (!jaAnimou) {
      this.deveAnimarCard = true;
      // Define a bandeira para travar a animação nas próximas navegações
      sessionStorage.setItem('home-card-animado', 'true');
    }
  }

  toggleDropdown(event: Event) {
    event.stopPropagation(); 
    this.mostrarDropdown = !this.mostrarDropdown;
  }

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