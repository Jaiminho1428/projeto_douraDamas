import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  providers: [AuthService]
})
export class Login {
  nome = '';
  telefone = '';
  email = '';
  senha = '';
  estaCadastrando = false;
  mensagem = '';

  constructor(private auth: AuthService, private router: Router) {}

  alternarCadastro() {
    this.estaCadastrando = !this.estaCadastrando;
    this.mensagem = '';
  }

  cadastrar() {
    if (!this.nome || !this.telefone || !this.email || !this.senha) {
      this.mensagem = 'Preencha todos os campos para cadastrar.';
      return;
    }
    const ok = this.auth.registrar({ nome: this.nome, telefone: this.telefone, email: this.email, senha: this.senha });
    if (ok) {
      this.router.navigate(['/home']);
    } else {
      this.mensagem = 'E-mail ou telefone já cadastrado.';
    }
  }

  entrar() {
    if (!this.email || !this.senha) {
      this.mensagem = 'Informe e-mail e senha.';
      return;
    }
    const ok = this.auth.entrar(this.email, this.senha);
    if (ok) this.router.navigate(['/home']);
    else this.mensagem = 'Credenciais inválidas. Se for seu primeiro acesso, cadastre-se.';
  }
}
