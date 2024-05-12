import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../Servicios/empleado.service2';

@Component({
  selector: 'tabla-empleados',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  empleados: any[] = [];
  empleadosFiltrados: any[] = [];

  constructor(private _empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados(): void {
    this._empleadoService.getEmpleados().subscribe(data => {
      this.empleados = [];
      data.forEach((element: any) => {
        const empleadoData = element.payload.doc.data();
        const empleado: any = {
          id: element.payload.doc.id,
          nombre: empleadoData.nombre,
          email: empleadoData.email,
          phone: empleadoData.phone,
        };
        this.empleados.push(empleado);
      });
      this.empleadosFiltrados = this.empleados; // Inicialmente, mostrar todos los empleados
      console.log('Empleados en la colección:', this.empleados);
    }, error => {
      console.error('Error al obtener empleados:', error);
    });
  }

  eliminarEmpleado(id: string): void {
    this._empleadoService.eliminarEmpleado(id).then(() => {
      console.log('Empleado eliminado con éxito');
      this.showNotification('Empleado eliminado correctamente');
      this.getEmpleados(); // Actualizar la lista de empleados después de eliminar
    }).catch(error => {
      console.error('Error al eliminar empleado:', error);
    });
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

  buscarEmpleado(valor: string) {
    if (valor) {
      this.empleadosFiltrados = this.empleados.filter(empleado =>
        empleado.nombre.toLowerCase().includes(valor.toLowerCase())
      );
    } else {
      this.empleadosFiltrados = this.empleados;
    }
  }

  onBuscarEmpleado(event: any) {
    const valor = event.target.value;
    this.buscarEmpleado(valor);
  }

}
