import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Servicos } from './components/servicos/servicos';
import { SaibaMais } from './components/saiba-mais/saiba-mais';
import { Contato } from './components/contato/contato';
import { Agendar } from './components/agendar/agendar';
import { Login } from './components/login/login';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'home', component: Home, canActivate: [AuthGuard] },
  { path: 'servicos', component: Servicos, canActivate: [AuthGuard] },
  { path: 'saiba-mais', component: SaibaMais, canActivate: [AuthGuard] },
  { path: 'contato', component: Contato, canActivate: [AuthGuard] },
  { path: 'agendar', component: Agendar, canActivate: [AuthGuard] },
];
