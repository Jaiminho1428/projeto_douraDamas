import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
	selector: 'app-agendar',
	standalone: true,
	imports: [CommonModule, FormsModule, RouterModule],
	templateUrl: './agendar.html',
	styleUrls: ['./agendar.css']
})
export class Agendar implements OnInit {
	selecaoServico = '';
	nome = '';
	telefone = '';
	data = '';
	pacoteSelecionado = 'Basico';
	confirmacao = '';
	precoFinal: number | null = null;

	pacotes = [
		{ id: 'Basico', label: 'Básico', price: 80, info: 'Aplicação simples + hidratação' },
		{ id: 'Premium', label: 'Básico + Doura pelos', price: 90, info: 'Camadas personalizadas + brilho'},
		{ id: 'Evento', label: 'Neon', price: 200, info: 'Realce intenso e finalização' }
	];

	constructor(private route: ActivatedRoute, private router: Router) {}

	ngOnInit() {
		const serv = this.route.snapshot.queryParamMap.get('servico');
		if (serv) this.selecaoServico = serv;
	}

	calcularPreco() {
		const pacote = this.pacotes.find(p => p.id === this.pacoteSelecionado);
		if (!pacote) return;
		this.precoFinal = pacote.price;
		return this.precoFinal;
	}

	agendar() {
		if (!this.data) {
			this.confirmacao = 'Preencha a data para confirmar.';
			return;
		}
		this.calcularPreco();
		const pacote = this.pacotes.find(p => p.id === this.pacoteSelecionado);
		this.confirmacao = `Agendamento solicitado: ${this.selecaoServico || 'Serviço'} — ${pacote?.label}. Data: ${this.data}. Preço: R$ ${this.precoFinal?.toFixed(2)}`;
	}
}
