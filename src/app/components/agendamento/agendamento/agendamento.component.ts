import { Agendamento } from './../../../model/agendamento';
import { Medico } from './../../../model/medico';
import { MedicoService } from './../../../services/medico.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent implements OnInit {

  value: Date;

  medicos: Medico[] = []

  especialidades: string[] = [];

  idUser = JSON.parse(localStorage.getItem('idUser') || '{}');

  

  constructor(private medicoService: MedicoService) {

  }
  
  formulario: FormGroup;
  formBuilder = new FormBuilder();

  calendar_br: any;

  ngOnInit(): void {
    this.initForm();
    this.enableMedic();
    this.listarMedicos();

    this.calendar_br = {
      firstDayOfWeek: 1,
      dayNames: ['SAAA', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      dayNamesShort: ['sA', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      dayNamesMin: ['sA', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
          'November', 'December'],
      monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      today: 'Today',
      clear: 'Clear',
    }
  }

  initForm(): void {
    this.formulario = this.formBuilder.group({
      medico: [null],
      especialidade: [null],
      data: [null],
      value: [null]
    })

    this.formulario.get('medico')?.disable();
  }

  enableMedic() {
    this.formulario.get('especialidade')?.valueChanges.subscribe(x => {
      console.log('change')
      this.formulario.get('medico')?.enable();
    })
  }

  listarMedicos() {
    this.medicoService.listar().subscribe((data) => {
      data.forEach(medico => this.especialidades.push (medico.especialidade));
      this.medicos = data;
      console.log('listando', this.medicos);
      console.log('especialidade', this.especialidades)
    })
  }

  agendar() {
    console.log(this.montarJson())
  }

  montarJson(): Agendamento {
    return {
      data: this.formulario.get('data')?.value,
      idMedico: parseInt(this.formulario.get('medico')?.value),
      idPaciente: this.idUser
    }
  }

}
