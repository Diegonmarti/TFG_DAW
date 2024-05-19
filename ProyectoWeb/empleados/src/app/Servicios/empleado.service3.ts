import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService3 {

  private dbPath = '/Datos Cuidadores';

  constructor(private db: AngularFireDatabase) { }

  agregarEmpleado(empleado: any): Promise<void> {
    const id = this.db.createPushId();
    return this.db.list(this.dbPath).set(id, empleado);
  }

  getEmpleados3(): Observable<any[]> {
    return this.db.list(this.dbPath).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.key, ...c.payload.val() as any }))
      )
    );
  }

  eliminarEmpleado3(id: string): Promise<void> {
    return this.db.list(this.dbPath).remove(id);
  }
}
