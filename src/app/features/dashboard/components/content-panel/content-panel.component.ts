import { Component } from '@angular/core';
// Data for child components will be defined here or passed from a service.
// For simplicity, child components will have their own hardcoded data for now.

@Component({
  selector: 'app-content-panel',
  templateUrl: './content-panel.component.html',
  // styleUrls: ['./content-panel.component.scss']
  standalone: false
})
export class ContentPanelComponent {
  constructor() { }
}