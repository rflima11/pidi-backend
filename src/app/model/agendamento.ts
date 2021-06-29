import { Paciente } from './paciente';
import { Medico } from './medico';
export interface Agendamento {

  idPaciente?: number;
  idMedico?: number;
  data?: Date
}