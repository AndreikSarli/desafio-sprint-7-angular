import { Component, OnInit, HostListener } from '@angular/core'; // 👈 HostListener adicionado aqui para gerenciar o clique fora
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  veiculoSelecionado = 'mustang';

  // 👤 Variável de controle do menu suspenso do usuário
  mostrarDropdown = false;

  // Objeto central que alimenta a tela
  dadosVeiculo: any = {
    vendas: 0,
    conectados: 0,
    updateSoftware: 0,
    vin: '',
    odometro: '',
    combustivel: '',
    status: '',
    lat: '',
    long: '',
    imagem: 'mustang.png',
  };

  // Mapeamento inverso para o Angular descobrir o modelo a partir do ID que a sua API retorna
  modelosPorId: { [key: number]: string } = {
    1: 'mustang',
    2: 'ranger',
    3: 'territory',
    4: 'bronco',
  };

  // Mapeamento dos códigos VIN padrão para quando mudar pelo Select manualmente
  vinsPorModelo: { [key: string]: string } = {
    mustang: '2FRHDUYS2Y63NHD22454',
    ranger: '2RFAASDY54E4HDU34874',
    territory: '2FRHDUYS2Y63NHD22455',
    bronco: '2RFAASDY54E4HDU34875',
  };

  // Caminhos das imagens na sua pasta public do Angular
  imagensPorModelo: { [key: string]: string } = {
    mustang: 'mustang.png',
    ranger: 'ranger.png',
    territory: 'territory.png',
    bronco: 'broncoSport.png',
  };

  buscaVinCtrl = new FormControl('');
  exibirLinhaTabela = true;

  constructor(
    private router: Router,
    public menuService: MenuService,
    private http: HttpClient,
  ) {}

  ngOnInit() {
  // 1. Inicializa a tela com o Mustang padrão (isso preenche o objeto dadosVeiculo)
  this.carregarDadosPorModelo(this.veiculoSelecionado);

  // 🏎️ CORREÇÃO AQUI: Pega o VIN padrão que acabou de ser mapeado para o Mustang e joga no Input
  if (this.dadosVeiculo?.vin) {
    // Usamos o { emitEvent: false } para preencher apenas o visual do campo, 
    // evitando disparar a busca do RxJS desnecessariamente no primeiro load.
    this.buscaVinCtrl.setValue(this.dadosVeiculo.vin, { emitEvent: false });
  }

  // 🎯 PROGRAMAÇÃO REATIVA COM RxJS: Busca Global por VIN Inteligente!
  this.buscaVinCtrl.valueChanges
    .pipe(
      debounceTime(500), // Aguarda o usuário terminar de digitar
      distinctUntilChanged(), // Evita chamadas repetidas para o mesmo valor
      map((valor) => (valor ? valor.trim().toUpperCase() : '')), // Normaliza o texto
    )
    .subscribe((vinDigitado) => {
      // Se apagar o campo de busca, volta a exibir o veículo que está selecionado no Select
      if (!vinDigitado) {
        this.exibirLinhaTabela = true;
        this.carregarDadosPorModelo(this.veiculoSelecionado);
        return;
      }

      // 🚀 Dispara o VIN digitado direto para a API para descobrir qual é o carro!
      this.http.post('http://localhost:3001/vehicleData', { vin: vinDigitado }).subscribe({
        next: (resposta: any) => {
          if (resposta && resposta.id) {
            this.exibirLinhaTabela = true;

            // 1. Descobre qual modelo pertence a esse ID retornado pela API
            const modeloIdentificado = this.modelosPorId[resposta.id] || this.veiculoSelecionado;

            // 2. Atualiza o Select na tela para o carro certo automaticamente!
            this.veiculoSelecionado = modeloIdentificado;

            // 3. Preenche os dados da tabela vindos do POST
            this.dadosVeiculo.vin = vinDigitado;
            this.dadosVeiculo.odometro = resposta.odometro;
            this.dadosVeiculo.combustivel = resposta.nivelCombustivel + '%';
            this.dadosVeiculo.status = resposta.status;
            this.dadosVeiculo.lat = resposta.lat;
            this.dadosVeiculo.long = resposta.long;
            this.dadosVeiculo.imagem = this.imagensPorModelo[modeloIdentificado];

            // 4. Atualiza os cards superiores (vendas, conectados...) para o novo modelo identificado
            this.atualizarCardsSuperiores(modeloIdentificado);
          }
        },
        error: (err) => {
          // Se o VIN não existir no switch da API, oculta a tabela e mostra o aviso
          console.error('VIN não encontrado ou erro na API:', err);
          this.exibirLinhaTabela = false;
        },
      });
    });
}

  // 👤 Abre e fecha o dropdown ao clicar no ícone do bonequinho
  toggleDropdown(event: Event) {
    event.stopPropagation(); // Impede que o clique feche o menu no mesmo instante
    this.mostrarDropdown = !this.mostrarDropdown;
  }

  // 👤 Fecha o menu automaticamente se houver clique em qualquer outro lugar do dashboard
  @HostListener('document:click')
  cliqueFora() {
    this.mostrarDropdown = false;
  }

  // Quando o usuário muda manualmente pelo Select de chaves
  onChangeVeiculo() {
    const vinAlvo = this.vinsPorModelo[this.veiculoSelecionado] || '';
    this.buscaVinCtrl.setValue(vinAlvo, { emitEvent: false }); // Preenche com o VIN sem disparar a busca automática
    this.exibirLinhaTabela = true;
    this.carregarDadosPorModelo(this.veiculoSelecionado);
  }

  // Carrega tudo baseado no modelo selecionado no Select
  carregarDadosPorModelo(modelo: string) {
    const vinAlvo = this.vinsPorModelo[modelo] || '';
    this.dadosVeiculo.vin = vinAlvo;
    this.dadosVeiculo.imagem = this.imagensPorModelo[modelo];

    this.atualizarCardsSuperiores(modelo);

    this.http.post('http://localhost:3001/vehicleData', { vin: vinAlvo }).subscribe({
      next: (resposta: any) => {
        if (resposta) {
          this.dadosVeiculo.odometro = resposta.odometro;
          this.dadosVeiculo.combustivel = resposta.nivelCombustivel + '%';
          this.dadosVeiculo.status = resposta.status;
          this.dadosVeiculo.lat = resposta.lat;
          this.dadosVeiculo.long = resposta.long;
        }
      },
      error: (err) => console.error('Erro ao buscar dados da tabela:', err),
    });
  }

  // Busca na rota GET /vehicles as estatísticas do topo para o modelo atual
  atualizarCardsSuperiores(modelo: string) {
    this.http.get('http://localhost:3001/vehicles').subscribe({
      next: (resposta: any) => {
        if (resposta && resposta.vehicles) {
          const dadosCard = resposta.vehicles.find((v: any) =>
            v.vehicle.toLowerCase().includes(modelo.toLowerCase()),
          );
          if (dadosCard) {
            this.dadosVeiculo.vendas = dadosCard.volumetotal;
            this.dadosVeiculo.conectados = dadosCard.connected;
            this.dadosVeiculo.updateSoftware = dadosCard.softwareUpdates;
          }
        }
      },
      error: (err) => console.error('Erro ao atualizar cards:', err),
    });
  }

  logout() {
    localStorage.removeItem('ford-login-auto');
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
