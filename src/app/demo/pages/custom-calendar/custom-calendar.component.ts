import { Component, OnInit, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ChartDB } from 'src/app/fake-data/chartDB';
import { CommonModule } from '@angular/common';
import { Evento } from '../../data/Evento';
import { User } from '../../data/User';
import Swal from 'sweetalert2';

import { ApexOptions, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { CustomCalendar } from '../../data/CustomCalendar';
import { CustomCalendarService } from 'src/app/@theme/services/custom-calendar.service';
import { RelationshipCalendar } from 'src/app/@theme/services/relationship-calendar.service';
import { LoginService } from 'src/app/@theme/services/login.service';
import { Response } from '../../data/Response';

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
  emailUser: string = '';
  cve_calendar: string = '';
  valorExtra: string = '';
  taskSeleccionado: any = null;
  mostrarApartadoDetallesCalendario = false;
  calendar_name: string = '';
  detalleCalendarioSeleccionado: any = null;
  fechaEvento: string = '';
  descripcionEvento: string = '';
  uuid_user: any = '';
  calendarPlugins = [dayGridPlugin];
  eventos: Evento[] = [];
  users: User[] = [];
  mostrarFormularioAgregarClientes = false;

  CustomCalendars: CustomCalendar[] = [];

  constructor(
    private customCalendarService:  CustomCalendarService,
    private relationshipCalendar: RelationshipCalendar,
    private userService: LoginService,
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

    List_transactionEvent2 = [
      {
        icon: 'Ev',
        tooltip: '10,000 Tracks',
        bg: 'text-primary-500 bg-primary-50',
        name: 'Evento generico',
        time: '#Event-T00232',
        amount: '$000,000',
        amount_position: 'ti ti-arrow-down-left',
        percentage: '10.6%',
        amount_type: 'text-warn-500',
        calendar_name: 'Calendario Generico',
        cve_calendar: 'CVE-0001',
        status: '1',
        create_at: '2023-10-01'
      }
    ];

    List_users = [
      {
        uuid_user: "xxx",
        full_name: "xxx",
        email: "xxx"
      }
    ];

  async ConsultarCustomCalendar() {
    
    try {
      
      const body = {
        uuid_user: this.uuid_user
      };

      const res = await this.customCalendarService.consultarCustomCalendar(body) as { data: CustomCalendar[] };

      this.CustomCalendars = res.data;
      if (this.CustomCalendars.length === 0) {
        console.warn('No se encontraron calendarios personalizados para el usuario.');
        alert('No se encontraron calendarios personalizados para el usuario.');
        return;
      }

      this.List_transactionEvent = this.CustomCalendars.map(CustomCalendar => ({
        icon: 'AI',
        name: CustomCalendar.calendar_name,
        tooltip: '10,000 Tracks',
        bg: 'text-primary-500 bg-primary-50',
        time: 'text',
        amount: 'text',
        amount_position: 'ti ti-arrow-down-left',
        percentage: CustomCalendar.status === '1' ? 'Activo' : 'Inactivo',
        amount_type: CustomCalendar.status === '1' ? 'text-success-500': 'text-warn-500',
        cve_calendar: CustomCalendar.cve_calendar,
        calendar_name: CustomCalendar.calendar_name,
        create_at: CustomCalendar.create_at,
        status: CustomCalendar.status
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

  async verDetallesCalendario(task: any) {
    try {

      this.detalleCalendarioSeleccionado = task;
      this.mostrarApartadoDetallesCalendario = true;
      this.valorExtra = task.name;
      this.mostrarFormulario = false;
      this.cve_calendar = task.cve_calendar;

      let body = {
        uuid_user_create: this.uuid_user,
        cve_calendar: task.cve_calendar
      };

      const res = await this.relationshipCalendar.consultarRelationshipCalendar(body) as { data: Evento[] };
      this.eventos = res.data;

      if (this.eventos === null || this.eventos.length === 0) {
        this.alerta('info', 'Sin resultados', 'No se encontraron eventos para este calendario.');
        this.mostrarApartadoDetallesCalendario = false;
        return;
      }

      this.List_transactionEvent2 = this.eventos.map(evento => ({
        icon: 'AI',
        name: evento.name,
        tooltip: '10,000 Tracks',
        bg: 'text-primary-500 bg-primary-50',
        time: evento.description,
        amount: evento.date_event,
        amount_position: 'ti ti-arrow-down-left',
        percentage: task.status === '1' ? 'Activo' : 'Inactivo',
        amount_type: task.status === '1' ? 'text-success-500': 'text-warn-500',
        cve_calendar: task.cve_calendar,
        calendar_name: task.description,
        status: evento.status,
        create_at: task.create_at
      }));

      const bodyInfoUsuarios = {
        cve_calendar: task.cve_calendar
      };
      const usersInCalendar = await this.relationshipCalendar.consultarInfoClientesByCalendar(bodyInfoUsuarios) as {data: User[]};

      this.users = usersInCalendar.data;

      this.List_users = this.users.map(user => ({
        uuid_user: user.uuid_user,
        full_name: user.full_name,
        email: user.email
      }));

    }
    catch (error) {
      console.error('Error al crear el evento:', error);
      alert('Error al crear el evento. Por favor, inténtalo de nuevo más tarde.');
    }
    
  }

  async agregarClienteACalendario(task: any) {
    try {

      if( !this.emailUser) {
        console.error('Formulario inválido: faltan campos obligatorios.');
        return;
      }

      const cve_calendarCast = task;
      const userEmail = this.emailUser;
      const uuidUser = this.uuid_user;
      
      const bodyAsignacionCalendario = {
        cve_calendar: cve_calendarCast,
        uuid_user_create: uuidUser,
        email_user_relationship: userEmail,
      }

      const responseValidateUser = await this.relationshipCalendar.new(bodyAsignacionCalendario) as Response;

      if( responseValidateUser.success === false) {
        this.alerta('error', 'Error al agregar el usuario', responseValidateUser.message);
        this.emailUser = '';
        return;
      }

      this.emailUser = '';
      this.ConsultarCustomCalendar();

      this.alerta('success', 'Usuario agregado', responseValidateUser.message);

    }
    catch (error) {
      console.error('Error al crear el evento:', error);
      alert('Error al crear el evento. Por favor, inténtalo de nuevo más tarde.');
    }
    
  }

   async alerta(icon: 'success' | 'error' | 'warning' | 'info' | 'question', title: string, text: string) {
    if( !icon || !title || !text) {
      console.error('Error: icon, title, and text are required for the alert.');
      return;
    }
    
    Swal.fire({
      icon: icon ?? 'info',
      title: title ?? 'Información',
      text: text ?? 'No hay información disponible.',
      confirmButtonColor: '#3085d6'
    });
  }


}


