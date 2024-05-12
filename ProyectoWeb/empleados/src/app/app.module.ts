import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat'; // Importa AngularFireModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaEmpleadosComponent } from './Componentes/lista-empleados/lista-empleados.component';
import { CrearEmpleadosComponent } from './Componentes/crear-empleados/crear-empleados.component';
import { NavbarComponent } from './Componentes/navbar/navbar.component';
import { environment } from '../environments/environment';
import { TablaComponent } from './Componentes/tabla/tabla.component';
import { LoginComponent } from './Componentes/login/login.component'; // Importa environment correctamente
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí

@NgModule({
  declarations: [
    AppComponent,
    ListaEmpleadosComponent,
    CrearEmpleadosComponent,
    NavbarComponent,
    TablaComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase), // Inicializa AngularFire con la configuración de Firebase
    provideFirestore(() => getFirestore()) // Configura Firestore

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
