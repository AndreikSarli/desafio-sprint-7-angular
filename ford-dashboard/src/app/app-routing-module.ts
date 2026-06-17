import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { DashboardComponent } from './pages/dashboard/dashboard';

const routes: Routes = [
  { path: '', component: Login },
  { path: 'home', component: Home },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}