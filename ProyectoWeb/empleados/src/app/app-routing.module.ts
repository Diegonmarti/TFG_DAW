import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEmpleadosComponent } from './Componentes/crear-empleados/crear-empleados.component';
import { ListaEmpleadosComponent } from './Componentes/lista-empleados/lista-empleados.component';
import { TablaComponent } from './Componentes/tabla/tabla.component';
import { LoginComponent } from './Componentes/login/login.component';

const routes: Routes = [
  { path: 'tabla-empleados', component: TablaComponent },
  { path: 'crear-empleados', component: CrearEmpleadosComponent },
  { path: 'lista-empleados/:nombre', component: ListaEmpleadosComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', redirectTo: 'tabla-empleados', pathMatch: 'full' } // Ruta comodín al final
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
