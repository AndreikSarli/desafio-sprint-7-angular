import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // 👈 Adicionado o ReactiveFormsModule aqui
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { DashboardComponent } from './pages/dashboard/dashboard';

@NgModule({
  declarations: [App, Login, Home, DashboardComponent],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    FormsModule,
    ReactiveFormsModule // Habilita o [formControl] que usamos na busca por VIN
  ],
  providers: [provideHttpClient(), provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}