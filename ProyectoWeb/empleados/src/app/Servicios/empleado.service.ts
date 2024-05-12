import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private db: AngularFireDatabase) { }

  getEmpleadoPorNombre(nombre: string): Observable<any> {
    return this.db.object(`DatosDueños/${nombre}`).valueChanges();
  }
}


