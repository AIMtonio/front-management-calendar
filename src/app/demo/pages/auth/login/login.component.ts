// angular import
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginService } from 'src/app/@theme/services/login.service';
import { HttpClientModule } from '@angular/common/http';

// project import
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
    private loginService: LoginService 
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
    if (!this.Email || !this.password) {
      console.error('Formulario inválido: faltan campos obligatorios.');
      return;
    }
    console.log('Formulario enviado:', { Email: this.Email, password: this.password });

    let resp = await this.loginService.login({ Email: this.Email, password: this.password });

    console.log('Respuesta del servicio:', resp);
    

  }

}
