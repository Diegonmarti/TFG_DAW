import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../../Servicios/empleado.service2';

@Component({
  selector: 'app-crear-empleados',
  templateUrl: './crear-empleados.component.html',
  styleUrls: ['./crear-empleados.component.css']
})
export class CrearEmpleadosComponent implements OnInit {
  crearempleado: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private empleadoService: EmpleadoService) {
    this.crearempleado = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
  });
  }

  ngOnInit(): void {
  }

  agregarempleado() {
    this.submitted = true;
    if (this.crearempleado.invalid) {
      return;
    }

    const empleado: any = {
      nombre: this.crearempleado.value.nombre,
      email: this.crearempleado.value.email,
      phone: this.crearempleado.value.phone,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    };

    this.empleadoService.agregarEmpleado(empleado).then(() => {
      const notificationMessage = document.getElementById('notification-message');
      if (notificationMessage) {
        notificationMessage.textContent = 'Empleado agregado correctamente';
        this.showNotification();
        setTimeout(() => {
          this.hideNotification();
          this.resetForm(); // Resetear el formulario después de 4 segundos
        }, 4000); // Ocultar notificación después de 4 segundos
      }
    }).catch(error => {
      console.log(error);
    });
  }

  showNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
      notification.classList.add('show');
    }
  }

  hideNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
      notification.classList.remove('show');
      notification.classList.add('hide');
      setTimeout(() => {
        notification.classList.remove('hide');
      }, 300); // Retirar clase 'hide' después de la transición
    }
  }

  resetForm() {
    this.crearempleado.reset(); // Resetea el formulario a su estado inicial
    this.submitted = false; // Reinicia el estado de submitted a falso
  }
}
