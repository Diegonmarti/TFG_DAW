import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  onSubmit() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Ingrese el nombre de usuario y la contraseña.';
      return;
    }

    const username = this.sanitizeInput(this.username);
    const password = this.sanitizeInput(this.password);

    this.authService.login(username, password)
      .subscribe(
        isAuthenticated => {
          if (isAuthenticated) {
            this.router.navigate(['/tabla-empleados']);
            console.log('Sesión iniciada correctamente');
          } else {
            console.log('Credenciales incorrectas');
            this.errorMessage = 'Credenciales incorrectas';
          }
        },
        error => {
          console.log('Error al autenticar:', error);
        }
      );
  }

  private sanitizeInput(input: string): string {
    return input.replace(/[^a-zA-Z0-9]/g, '');
  }
}
