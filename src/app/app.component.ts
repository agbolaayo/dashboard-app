// src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false, // <--- REMOVE THIS LINE if present
  // imports: [DashboardModule], // <--- REMOVE THIS if using AppModule to declare/import DashboardModule
  templateUrl: './app.component.html',
})
export class AppComponent {
  title: string = 'dashboard-app';
}