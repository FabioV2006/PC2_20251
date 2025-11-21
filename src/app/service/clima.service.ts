import {HttpClient, HttpResponse} from '@angular/common/http';
import {Clima} from '../model/Clima';
import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  private apiURL = "http://localhost:8080/climas";
  constructor(private http: HttpClient)
  {}

  registrarClima(clima: Clima): Observable<Clima>
  {
    return this.http.post<Clima>(this.apiURL + "/inserciones", clima);
  }

  listarClima(): Observable<Clima[]> {
    return this.http.get<Clima[]>(this.apiURL + "/listas");
  }

  eliminarClima(id: number): Observable<any> {
    return this.http.delete( this.apiURL + "/" + id );
  }

  listarId(id: number): Observable<Clima> {
    return this.http.get<Clima>(`${this.apiURL}/${id}`);
  }

  actualizarClima(id: number, clima: Clima): Observable<Clima> {
    return this.http.put<Clima>(this.apiURL + "/actualizaciones", clima);
  }
}
