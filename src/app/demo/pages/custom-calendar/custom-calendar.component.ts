import { Component, OnInit, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ChartDB } from 'src/app/fake-data/chartDB';
import { CommonModule } from '@angular/common';


import { ApexOptions, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { CustomCalendar } from '../../data/CustomCalendar';
import { CustomCalendarService } from 'src/app/@theme/services/custom-calendar.service';

@Component({
  selector: 'app-view-events',
  imports: [SharedModule, FormsModule, NgApexchartsModule,CommonModule],
  templateUrl: './custom-calendar.component.html',
  styleUrls: ['./custom-calendar-component.scss']
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
  calendar_name: string = '';
  fechaEvento: string = '';
  descripcionEvento: string = '';
  uuid_user: any = '';
  calendarPlugins = [dayGridPlugin];

  CustomCalendars: CustomCalendar[] = [];

  constructor(
    private customCalendarService:  CustomCalendarService
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

    await this.ConsultarCustomCalendar();

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

  async ConsultarCustomCalendar() {
    
    try {
      
      const body = {
        uuid_user: this.uuid_user
      };

      const res = await this.customCalendarService.consultarCustomCalendar(body) as { data: CustomCalendar[] };

      console.log('Respuesta del servidor:', res);

      this.CustomCalendars = res.data;

      this.List_transactionEvent = this.CustomCalendars.map(CustomCalendar => ({
        icon: 'AI',
        name: CustomCalendar.calendar_name,
        tooltip: '10,000 Tracks',
        bg: 'text-primary-500 bg-primary-50',
        time: 'text',
        amount: 'text',
        amount_position: 'ti ti-arrow-down-left',
        percentage: CustomCalendar.status === '1' ? 'Activo' : 'Inactivo',
        amount_type: CustomCalendar.status === '1' ? 'text-success-500': 'text-warn-500'
      }));

    }
    catch (error) {
      console.error('Error al crear el evento:', error);
      alert('Error al crear el evento. Por favor, inténtalo de nuevo más tarde.');
    }
    
  }

  async crearCustomCalendar() {
    
    try {
      if (!this.calendar_name) {
        console.error('Formulario inválido: faltan campos obligatorios.');
        return;
      }

      let body = {
        calendar_name: this.calendar_name,
        uuid_user: this.uuid_user
      };

      const resp = await this.customCalendarService.crearCustomCalendar(body);
      console.log('Respuesta del servidor:', resp);


    }
    catch (error) {
      console.error('Error al crear el evento:', error);
      alert('Error al crear el evento. Por favor, inténtalo de nuevo más tarde.');
    }
    
  }

}


