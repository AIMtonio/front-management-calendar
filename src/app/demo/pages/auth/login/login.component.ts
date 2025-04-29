// angular import
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/@theme/services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'app-login',
  imports: [SharedModule, RouterModule, HttpClientModule], // Agregado HttpClientModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../authentication.scss']
})
export default class LoginComponent {
  // public props
  hide: boolean = true; // Controla la visibilidad de la contraseña
  email = new FormControl('', [Validators.required, Validators.email]);
  Email: string = ''; // Inicializa la propiedad Email
  password: string = ''; // Inicializa la propiedad password
  loginForm: FormGroup;
  

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router // Inyecta Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  // public method
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter an email';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  loginType = [
  ];

  async onSubmit() {

    try {
      if (!this.Email || !this.password) {
        console.error('Formulario inválido: faltan campos obligatorios.');
        return;
      }
      
      let body = {
        email: this.Email,
        password: this.password
      };

      let resp = await this.loginService.login(body).toPromise();

      if (resp.success == true) {
        console.log('exito:', resp.data);
        localStorage.setItem('token', resp.data);
        this.router.navigate(['/dashboard']);
        return;
        return;
      }else{
        console.log('error:', resp);
        return;
      }

    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
    

  }

}
