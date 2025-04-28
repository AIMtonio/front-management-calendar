// angular import
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'app-login',
  imports: [SharedModule, RouterModule],
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

  constructor(private fb: FormBuilder) {
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
    /*{
      image: 'assets/images/authentication/facebook.svg',
      alt: 'facebook',
      title: 'Sign In with Facebook'
    },
    {
      image: 'assets/images/authentication/twitter.svg',
      alt: 'twitter',
      title: 'Sign In with Twitter'
    },
    {
      image: 'assets/images/authentication/google.svg',
      alt: 'google',
      title: 'Sign In with Google'
    }*/
  ];

  onSubmit() {
    if (!this.Email || !this.password) {
      console.error('Formulario inválido: faltan campos obligatorios.');
      return;
    }
    console.log('Formulario enviado:', { Email: this.Email, password: this.password });
  }

}
