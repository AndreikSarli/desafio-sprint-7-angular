import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Dashboard } from './pages/dashboard/dashboard';

@NgModule({
  declarations: [App, Login, Home, Dashboard],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideHttpClient(), provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
