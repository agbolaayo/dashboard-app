import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { Observable, Subscription } from 'rxjs';
import { ImagePaths, SidebarConfig } from '../../core/constants/dashboard.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',  
  standalone: false
  // styleUrls: ['./dashboard.component.scss'] // If dashboard-specific styles exist
})
export class DashboardComponent implements OnInit, OnDestroy {
  isSidebarCollapsed$: Observable<boolean>;
  isMobileSidebarVisible$: Observable<boolean>;
  sidebarCollapserImagePath: string = ImagePaths.SIDEBAR_COLLAPSER;

  private subscriptions: Subscription = new Subscription();
  public currentSidebarWidth: number = SidebarConfig.INITIAL_WIDTH;
  public collapserButtonLeft: string = `${SidebarConfig.INITIAL_WIDTH - SidebarConfig.COLLAPSER_OFFSET}px`;


  constructor(public themeService: ThemeService) {
    this.isSidebarCollapsed$ = this.themeService.isSidebarCollapsed$;
    this.isMobileSidebarVisible$ = this.themeService.isMobileSidebarVisible$;
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.isSidebarCollapsed$.subscribe(collapsed => {
        this.currentSidebarWidth = collapsed ? SidebarConfig.COLLAPSED_WIDTH : SidebarConfig.INITIAL_WIDTH;
        this.collapserButtonLeft = `${this.currentSidebarWidth - SidebarConfig.COLLAPSER_OFFSET}px`;
      })
    );
  }

  toggleSidebar(): void {
    this.themeService.toggleSidebarCollapse();
  }

  toggleMobileMenu(): void {
    this.themeService.toggleMobileSidebarVisibility();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}