import { Medico } from './../model/medico';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const URL = "http://localhost:8080/medico"  //"https://run.mocky.io/v3/";

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  

  constructor(private httpClient: HttpClient) { }

  listar(): Observable<Medico[]> {
    return this.httpClient.get<Medico[]>(`${URL}`);
  }

}
