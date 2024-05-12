import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpleadoService } from '../../Servicios/empleado.service';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {
  empleado: any;

  constructor(private route: ActivatedRoute, private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const nombreEmpleado = params['nombre']; // Obtén el parámetro 'nombre' de la URL
      this.getEmpleadoPorNombre(nombreEmpleado);
    });
  }

  getEmpleadoPorNombre(nombre: string): void {
    this.empleadoService.getEmpleadoPorNombre(nombre).subscribe(
      (data: any) => {
        this.empleado = data;
      },
      (error) => {
        console.error('Error al obtener empleado:', error);
      }
    );
  }
}
