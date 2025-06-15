import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import DashboardComponent from './demo/pages/dashboard/dashboard.component';
import { FullCalendarModule } from '@fullcalendar/angular';


import { AdminComponent } from './demo/layout/admin';
import { EmptyComponent } from './demo/layout/empty';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./demo/pages/dashboard/dashboard.component')
      },
      {
        path: 'component',
        loadChildren: () => import('./demo/pages/components/component.module').then((m) => m.ComponentModule)
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/pages/other/sample-page/sample-page.component')
      },
      {
        path: 'events-management',
        loadComponent: () => import('./demo/pages/events-management/events-management.component')
      },
      {
        path: 'view-events',
        loadComponent: () => import('./demo/pages/view-events/view-events.component')
      },
       {
        path: 'custom-calendar',
        loadComponent: () => import('./demo/pages/custom-calendar/custom-calendar.component')
      }
    ]
  },
  {
    path: '',
    component: EmptyComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/auth/auth.module').then((m) => m.AuthModule)
      }
    ]
  },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FullCalendarModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
