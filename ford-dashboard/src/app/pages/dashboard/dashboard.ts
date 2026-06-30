import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  veiculoSelecionado = 'mustang';
  veiculos: any[] = [];

  mostrarDropdown = false;

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
    imagem: '',
  };

  modelosPorId: { [key: number]: string } = {
    1: 'ranger',
    2: 'mustang',
    3: 'territory',
    4: 'bronco',
  };

  vinsPorModelo: { [key: string]: string } = {
    ranger: '2FRHDUYS2Y63NHD22454',
    mustang: '2RFAASDY54E4HDU34874',
    territory: '2FRHDUYS2Y63NHD22455',
    bronco: '2RFAASDY54E4HDU34875',
  };

  imagensPorModelo: { [key: string]: string } = {};

  buscaVinCtrl = new FormControl('');
  exibirLinhaTabela = true;

  constructor(
    private router: Router,
    public menuService: MenuService,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.http.get('http://localhost:3001/vehicles').subscribe({
      next: (resposta: any) => {
        if (resposta && resposta.vehicles) {
          resposta.vehicles.forEach((v: any) => {
            const chave = v.vehicle.toLowerCase().includes('bronco')
              ? 'bronco'
              : v.vehicle.toLowerCase();
            this.imagensPorModelo[chave] = v.img;
          });

          let listaVindaDaApi = resposta.vehicles.map((v: any) => {
            const nomeCarro = v.vehicle;
            const valorCarro = nomeCarro.toLowerCase().includes('bronco')
              ? 'bronco'
              : nomeCarro.toLowerCase();
            return { nome: nomeCarro, valor: valorCarro };
          });

          const ordemDosCarros = ['mustang', 'ranger', 'territory', 'bronco'];
          this.veiculos = listaVindaDaApi.sort((a: any, b: any) => {
            return ordemDosCarros.indexOf(a.valor) - ordemDosCarros.indexOf(b.valor);
          });

          this.dadosVeiculo.imagem = this.imagensPorModelo[this.veiculoSelecionado];
        }
      },
      error: (err) => console.error('Erro ao carregar lista de veículos para o filtro:', err),
    });

    this.carregarDadosPorModelo(this.veiculoSelecionado);

    if (this.dadosVeiculo?.vin) {
      this.buscaVinCtrl.setValue(this.dadosVeiculo.vin, {
        emitEvent: false,
      });
    }

    this.buscaVinCtrl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((valor) => (valor ? valor.trim().toUpperCase() : '')),
        filter((valor) => valor.length === 0 || valor.length >= 5),
      )
      .subscribe((vinDigitado) => {
        if (!vinDigitado) {
          this.exibirLinhaTabela = true;
          this.carregarDadosPorModelo(this.veiculoSelecionado);
          return;
        }

        this.http
          .post('http://localhost:3001/vehicleData', {
            vin: vinDigitado,
          })
          .subscribe({
            next: (resposta: any) => {
              if (resposta && resposta.id) {
                this.exibirLinhaTabela = true;

                const modeloIdentificado =
                  this.modelosPorId[resposta.id] || this.veiculoSelecionado;

                this.veiculoSelecionado = modeloIdentificado;

                this.dadosVeiculo.vin = vinDigitado;
                this.dadosVeiculo.odometro = resposta.odometro;
                this.dadosVeiculo.combustivel = resposta.nivelCombustivel + '%';
                this.dadosVeiculo.status = resposta.status;
                this.dadosVeiculo.lat = resposta.lat;
                this.dadosVeiculo.long = resposta.long;

                this.dadosVeiculo.imagem = this.imagensPorModelo[modeloIdentificado];

                this.atualizarCardsSuperiores(modeloIdentificado);
              }
            },
            error: (err) => {
              console.error('VIN não encontrado ou erro na API:', err);

              this.exibirLinhaTabela = true;

              // Zera os cards superiores
              this.dadosVeiculo.vendas = 0;
              this.dadosVeiculo.conectados = 0;
              this.dadosVeiculo.updateSoftware = 0;

              // Limpa os dados do veículo
              this.dadosVeiculo.odometro = '';
              this.dadosVeiculo.combustivel = '';
              this.dadosVeiculo.status = '';
              this.dadosVeiculo.lat = '';
              this.dadosVeiculo.long = '';

              // Remove a imagem do último veículo
              this.dadosVeiculo.imagem = '';

              // Limpa o VIN armazenado
              this.dadosVeiculo.vin = '';
            },
          });
      });
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.mostrarDropdown = !this.mostrarDropdown;
  }

  @HostListener('document:click')
  cliqueFora() {
    this.mostrarDropdown = false;
  }

  onChangeVeiculo() {
    const vinAlvo = this.vinsPorModelo[this.veiculoSelecionado] || '';

    this.buscaVinCtrl.setValue(vinAlvo, {
      emitEvent: false,
    });

    this.exibirLinhaTabela = true;
    this.carregarDadosPorModelo(this.veiculoSelecionado);
  }

  carregarDadosPorModelo(modelo: string) {
    const vinAlvo = this.vinsPorModelo[modelo] || '';

    this.dadosVeiculo.vin = vinAlvo;

    if (this.imagensPorModelo[modelo]) {
      this.dadosVeiculo.imagem = this.imagensPorModelo[modelo];
    }

    this.atualizarCardsSuperiores(modelo);

    this.http
      .post('http://localhost:3001/vehicleData', {
        vin: vinAlvo,
      })
      .subscribe({
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
