import { Component, OnInit } from '@angular/core';
import { EmpleadoService2 } from '../../Servicios/empleado.service2';
import { EmpleadoService3 } from '../../Servicios/empleado.service3';

@Component({
  selector: 'tabla-empleados',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  empleados: any[] = [];
  empleadosFiltrados: any[] = [];
  role: string = 'owner';

  constructor(private _empleadoService: EmpleadoService2, private _empleadoService3: EmpleadoService3) {}

  ngOnInit(): void {
    this.getEmpleadosDueño();
  }

  onRoleChange(event: any): void {
    this.role = event.target.value;
    if (this.role === 'owner') {
      this.getEmpleadosDueño();
    } else {
      this.getEmpleadosCuidador();
    }
  }

  getEmpleadosDueño(): void {
    this._empleadoService.getEmpleados().subscribe((data: any) => {
      this.empleados = data.map((e: any) => ({
        id: e.payload.doc.id,
        ...e.payload.doc.data()
      }));
      this.empleadosFiltrados = this.empleados;
      console.log('Empleados en la colección (Dueños):', this.empleados);
    }, (error: any) => {
      console.error('Error al obtener empleados (Dueños):', error);
    });
  }

  getEmpleadosCuidador(): void {
    this._empleadoService3.getEmpleados3().subscribe((data: any) => {
      this.empleados = data;
      this.empleadosFiltrados = this.empleados;
      console.log('Empleados en la colección (Cuidadores):', this.empleados);
    }, (error: any) => {
      console.error('Error al obtener empleados (Cuidadores):', error);
    });
  }

  eliminarEmpleado(id: string): void {
    if (this.role === 'owner') {
      this._empleadoService.eliminarEmpleado(id).then(() => {
        console.log('Empleado eliminado con éxito');
        this.showNotification('Empleado eliminado correctamente');
        this.getEmpleadosDueño();
      }).catch((error: any) => {
        console.error('Error al eliminar empleado:', error);
      });
    } else {
      this._empleadoService3.eliminarEmpleado3(id).then(() => {
        console.log('Empleado eliminado con éxito');
        this.showNotification('Empleado eliminado correctamente');
        this.getEmpleadosCuidador();
      }).catch((error: any) => {
        console.error('Error al eliminar empleado:', error);
      });
    }
  }

  showNotification(message: string): void {
    const notificationMessage = document.getElementById('notification-message');
    if (notificationMessage) {
      notificationMessage.textContent = message;
      this.showNotificationElement();
      setTimeout(() => {
        this.hideNotificationElement();
      }, 4000);
    }
  }

  showNotificationElement(): void {
    const notification = document.getElementById('notification');
    if (notification) {
      notification.classList.add('show');
    }
  }

  hideNotificationElement(): void {
    const notification = document.getElementById('notification');
    if (notification) {
      notification.classList.remove('show');
      notification.classList.add('hide');
      setTimeout(() => {
        notification.classList.remove('hide');
      }, 300);
    }
  }

  buscarEmpleado(valor: string): void {
    if (valor) {
      this.empleadosFiltrados = this.empleados.filter(empleado =>
        empleado.nombre.toLowerCase().includes(valor.toLowerCase())
      );
    } else {
      this.empleadosFiltrados = this.empleados;
    }
  }

  onBuscarEmpleado(event: any): void {
    const valor = event.target.value;
    this.buscarEmpleado(valor);
  }
}
