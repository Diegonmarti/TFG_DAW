import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService2 {
  constructor(private firestore: AngularFirestore) { }

  agregarEmpleado(empleado: any): Promise<any> {
    return this.firestore.collection('Datos Usuarios').add(empleado);
  }

  getEmpleados(): Observable<any> {
    return this.firestore.collection("Datos Usuarios").snapshotChanges();
  }

  eliminarEmpleado(id: string): Promise<any> {
    return this.firestore.collection('Datos Usuarios').doc(id).delete();
  }
}
