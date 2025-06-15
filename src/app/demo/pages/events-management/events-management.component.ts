// angular import
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { EventoService } from 'src/app/@theme/services/events.service'; 

@Component({
  selector: 'app-sample-page',
  imports: [SharedModule, FormsModule], // Importa FormsModule para usar ngModel
  templateUrl: './events-management.component.html',
  styleUrls: ['./events-management-component.scss']
})
export default class SamplePageComponent implements OnInit {

  nombreEvento: string = '';
  fechaEvento: string = '';
  descripcionEvento: string = '';
  uuid_user: any = '';

  constructor(
    private eventService: EventoService
  ) { }
  
  ngOnInit(): void {

    const data = localStorage.getItem('token');
    console.log('Data from localStorage:', data);

    this.uuid_user = sessionStorage.getItem('uuid_user');
    console.log('Data from sessionStorage:', this.uuid_user);

  }

  async crearEvento() {
    
    try {
      if (!this.nombreEvento || !this.fechaEvento || !this.descripcionEvento) {
        console.error('Formulario inválido: faltan campos obligatorios.');
        return;
      }

      let body = {
        name: this.nombreEvento,
        date_event: this.fechaEvento,
        description: this.descripcionEvento,
        uuid_user: this.uuid_user
      };

      const resp = await this.eventService.crearEvento(body);
      console.log('Respuesta del servidor:', resp);

      console.log('Evento creado:', body);
      alert('Evento creado exitosamente');

    }
    catch (error) {
      console.error('Error al crear el evento:', error);
      alert('Error al crear el evento. Por favor, inténtalo de nuevo más tarde.');
    }
    
  }

}


