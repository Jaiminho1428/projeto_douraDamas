import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-contato',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './contato.html',
	styleUrls: ['./contato.css']
})
export class Contato {}
