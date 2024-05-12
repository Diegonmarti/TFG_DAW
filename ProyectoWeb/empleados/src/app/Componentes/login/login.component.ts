import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isUsernameValid: boolean = true;
  isPasswordValid: boolean = true;

  constructor(private router: Router) { }

  onSubmit() {
    if (this.username === 'diego' && this.password === '123456') {
      this.router.navigate(['/tabla-empleados']);
      console.log('Sesión iniciada correctamente');
    } else {
      console.log('Credenciales incorrectas');
      this.isUsernameValid = (this.username === 'diego');
      this.isPasswordValid = (this.password === '123456');
    }
  }
}
