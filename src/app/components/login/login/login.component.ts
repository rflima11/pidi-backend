import { MedicoService } from './../../../services/medico.service';
import { Paciente } from './../../../model/paciente';
import { Medico } from './../../../model/medico';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges {


  isMedico: boolean;

  isPaciente: boolean;

  formulario: FormGroup;
  formBuilder = new FormBuilder();

  medicos: Medico[] = [];
  pacientes: Paciente[] = [];


  constructor(private routerService: Router, private medicoService: MedicoService) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(): void {
    console.log('isMedico', this.isMedico);
    console.log('isPaciente', this.isPaciente);
  }

  

  initForm(): void {
    this.formulario = this.formBuilder.group({
      usuario: [null],
      senha: [null],
    })
  }

  montarJson() {
    return {
      usuario: this.formulario.get('usuario')?.value,
      senha: this.formulario.get('senha')?.value,
    }
  }

  carregarMedicos() {
    this.medicoService.listar().subscribe(data => {
      this.medicos = data;
      console.log("this.medicos", this.medicos)
    })
  }

  carregarPacientes() {

  }


  login() {
    console.log('this.isMedico', this.isMedico)
    console.log('montarJson', this.montarJson());
 //   if (this.loginForm.get('usuario')?.value === "admin" && this.loginForm.get('senha')?.value === "12345") {
 //     this.routerService.navigate(['agendamento']);
 //   }
    
    if (this.isMedico && this.medicos.length > 0) {
      console.log('estou aqui')
      const medicoLogado = this.medicos.filter((medico) => {
        console.log('medico.usuario ' + medico.usuario + ' e ' + this.formulario.get('usuario')?.value)
        console.log(medico.usuario == this.formulario.get('usuario')?.value);
        console.log('medico.senha ' + medico.senha + ' e ' + this.formulario.get('senha')?.value)
        console.log(medico.senha == this.formulario.get('senha')?.value)
     return medico.usuario == this.formulario.get('usuario')?.value
          &&
        medico.senha == this.formulario.get('senha')?.value
     })
      console.log('medicologado', medicoLogado)
      if (medicoLogado.length > 0) {
        localStorage.setItem('idUser', JSON.stringify(medicoLogado[0].id));
        this.routerService.navigate(['agendamento'])
      }
    }
  }

}
