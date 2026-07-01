import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { DashboardComponent } from './pages/dashboard/dashboard';
// 1. Importa o guard usando um ponto só, já que as rotas estão soltas na pasta app
import { loginGuardGuard } from './services/login-guard-guard';

const routes: Routes = [
  { path: '', component: Login },
  
  // 2. Protege as rotas adicionando a propriedade canActivate
  { path: 'home', component: Home, canActivate: [loginGuardGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [loginGuardGuard] },
  
  // 3. Rota curinga: se digitarem qualquer rota inexistente, manda de volta para o login
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}