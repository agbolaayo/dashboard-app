import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentPanelComponent } from './components/content-panel/content-panel.component';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { AttackPathCardComponent } from './components/attack-path-card/attack-path-card.component';
import { DataTableCardComponent } from './components/data-table-card/data-table-card.component';
import { SummaryChartCardComponent } from './components/summary-chart-card/summary-chart-card.component';
import { RemediationEntryCardComponent } from './components/remediation-entry-card/remediation-entry-card.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    ContentPanelComponent,
    InfoCardComponent,
    AttackPathCardComponent,
    DataTableCardComponent,
    SummaryChartCardComponent,
    RemediationEntryCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DashboardComponent // Export if app.component directly uses it
  ]
})
export class DashboardModule { }