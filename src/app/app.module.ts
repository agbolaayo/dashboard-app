import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DashboardModule } from './features/dashboard/dashboard.module';
// import { CoreModule } from './core/core.module'; // If you create a CoreModule

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // CoreModule, // If CoreModule is created to provide services like ThemeService
    DashboardModule
  ],
  providers: [], // ThemeService is providedIn: 'root'
  bootstrap: [AppComponent]
})
export class AppModule { }