import { Component, OnInit, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { EventoService } from 'src/app/@theme/services/events.service'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import { ChartDB } from 'src/app/fake-data/chartDB';
import { CommonModule } from '@angular/common';


import { ApexOptions, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { Evento } from '../../data/Evento';


@Component({
  selector: 'app-view-events',
  imports: [SharedModule, FormsModule, NgApexchartsModule,CommonModule],
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events-component.scss']
})

export default class ViewEvents implements OnInit {

  chart = viewChild<ChartComponent>('chart');
  earningChart: Partial<ApexOptions>;
  pageViewChart: Partial<ApexOptions>;
  totalTaskChart: Partial<ApexOptions>;
  downloadChart: Partial<ApexOptions>;
  monthlyRevenueChart: Partial<ApexOptions>;
  totalTasksChart: Partial<ApexOptions>;
  pendingTasksChart: Partial<ApexOptions>;
  totalIncomeChart: Partial<ApexOptions>;

  chartDB: any;

  preset = ['#4680FF'];
  monthlyColor = ['#4680FF', '#8996a4'];
  incomeColors = ['#4680FF', '#E58A00', '#2CA87F', '#b5ccff'];

  mostrarFormulario = false;
  nombreEvento: string = '';
  fechaEvento: string = '';
  descripcionEvento: string = '';
  uuid_user: any = '';
  calendarPlugins = [dayGridPlugin];
  calendarEvents = [
    { title: 'Evento 1', date: '2025-06-10' },
    { title: 'Evento 2', date: '2025-06-15' }
  ];

  eventos: Evento[] = [];

  constructor(
    private eventService: EventoService
  ) { 
    this.chartDB = ChartDB;
    const {
      earningChart,
      totalTaskChart,
      downloadChart,
      totalTasksChart,
      pageViewChart,
      monthlyRevenueChart,
      pendingTasksChart,
      totalIncomeChart
    } = this.chartDB;
    this.earningChart = earningChart;
    this.pageViewChart = pageViewChart;
    this.totalTaskChart = totalTaskChart;
    this.downloadChart = downloadChart;
    this.monthlyRevenueChart = monthlyRevenueChart;
    this.totalTasksChart = totalTasksChart;
    this.pendingTasksChart = pendingTasksChart;
    this.totalIncomeChart = totalIncomeChart;
  }
  
  async ngOnInit(): Promise<void> {

    const data = localStorage.getItem('token');
    this.uuid_user = sessionStorage.getItem('uuid_user');

    await this.consultarEventos();

  }

    List_transactionEvent = [
      {
        icon: 'Ev',
        tooltip: '10,000 Tracks',
        bg: 'text-primary-500 bg-primary-50',
        name: 'Evento generico',
        time: '#Event-T00232',
        amount: '$000,000',
        amount_position: 'ti ti-arrow-down-left',
        percentage: '10.6%',
        amount_type: 'text-warn-500'
      }
    ];

    project = [
      {
        title: 'Invoice Generator'
      },
      {
        title: 'Package Upgrades'
      },
      {
        title: 'Figma Auto Layout'
      }
    ];

    income_card = [
      {
        background: 'bg-primary-500',
        item: 'Income',
        value: '$23,876',
        number: '+$763,43'
      },
      {
        background: 'bg-warning-500',
        item: 'Rent',
        value: '$23,876',
        number: '+$763,43'
      },
      {
        background: 'bg-success-500',
        item: 'Download',
        value: '$23,876',
        number: '+$763,43'
      },
      {
        background: 'bg-primary-200',
        item: 'Views',
        value: '$23,876',
        number: '+$763,43'
      }
    ];

  async consultarEventos() {
    
    try {
      
      const body = {
        uuid_user: this.uuid_user
      };

      const res = await this.eventService.consultarEventos(body) as { data: Evento[] };

      this.eventos = res.data;

      this.List_transactionEvent = this.eventos.map(evento => ({
        icon: 'AI',
        name: evento.name,
        tooltip: '10,000 Tracks',
        bg: 'text-primary-500 bg-primary-50',
        time: evento.description,
        amount: evento.date_event,
        amount_position: 'ti ti-arrow-down-left',
        percentage: evento.status === '1' ? 'Activo' : 'Inactivo',
        amount_type: evento.status === '1' ? 'text-success-500': 'text-warn-500'
      }));

    }
    catch (error) {
      console.error('Error al crear el evento:', error);
      alert('Error al crear el evento. Por favor, inténtalo de nuevo más tarde.');
    }
    
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


