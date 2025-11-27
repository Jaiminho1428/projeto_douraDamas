import { Injectable } from '@angular/core';

interface Conta {
  nome: string;
  telefone: string;
  email: string;
  senha: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private chaveContas = 'dd_accounts';
  private chaveUsuario = 'dd_user';

  private lerContas(): Conta[] {
    const raw = localStorage.getItem(this.chaveContas);
    return raw ? JSON.parse(raw) as Conta[] : [];
  }

  private gravarContas(lista: Conta[]) {
    localStorage.setItem(this.chaveContas, JSON.stringify(lista));
  }

  registrar(conta: Conta): boolean {
    const contas = this.lerContas();
    const existe = contas.some(a => a.email === conta.email || a.telefone === conta.telefone);
    if (existe) return false;
    contas.push(conta);
    this.gravarContas(contas);
    localStorage.setItem(this.chaveUsuario, JSON.stringify({ nome: conta.nome, email: conta.email, telefone: conta.telefone }));
    return true;
  }

  entrar(email: string, senha: string): boolean {
    const contas = this.lerContas();
    const acc = contas.find(a => a.email === email && a.senha === senha);
    if (!acc) return false;
    localStorage.setItem(this.chaveUsuario, JSON.stringify({ nome: acc.nome, email: acc.email, telefone: acc.telefone }));
    return true;
  }

  sair(): void {
    localStorage.removeItem(this.chaveUsuario);
  }

  estaAutenticado(): boolean {
    return !!localStorage.getItem(this.chaveUsuario);
  }

  obterUsuario(): { nome: string; email: string; telefone: string } | null {
    const raw = localStorage.getItem(this.chaveUsuario);
    return raw ? JSON.parse(raw) : null;
  }
}
