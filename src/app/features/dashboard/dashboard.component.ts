import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { ImagePaths, SidebarConfig } from '../../core/constants/dashboard.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: false
})
export class DashboardComponent implements OnInit, OnDestroy {
  public sidebarCollapserImagePath: string = ImagePaths.SIDEBAR_COLLAPSER;

  public isDesktopAndCollapsed$: Observable<boolean>;
  public isMobileAndVisible$: Observable<boolean>;
  public collapserButtonLeftPx$: Observable<string>;
  public collapserButtonRotated$: Observable<boolean>;

  private subscriptions: Subscription = new Subscription();

  constructor(public themeService: ThemeService) {
    this.isDesktopAndCollapsed$ = combineLatest([
      this.themeService.isMobileView$,
      this.themeService.isDesktopSidebarCollapsed$
    ]).pipe(
      map(([isMobile, isDesktopCollapsed]) => !isMobile && isDesktopCollapsed),
      distinctUntilChanged()
    );

    this.isMobileAndVisible$ = combineLatest([
      this.themeService.isMobileView$,
      this.themeService.isMobileSidebarVisible$
    ]).pipe(
      map(([isMobile, isMobileVisible]) => isMobile && isMobileVisible),
      distinctUntilChanged()
    );

    this.collapserButtonLeftPx$ = combineLatest([
      this.themeService.isMobileView$,
      this.themeService.isDesktopSidebarCollapsed$,
      this.themeService.isMobileSidebarVisible$
    ]).pipe(
      map(([isMobile, isDesktopCollapsed, isMobileVisible]) => {
        if (isMobile) {
          return isMobileVisible
            ? `${SidebarConfig.INITIAL_WIDTH - SidebarConfig.COLLAPSER_OFFSET}px`
            : `${SidebarConfig.MOBILE_COLLAPSER_OFFSET_CLOSED}px`;
        } else {
          return isDesktopCollapsed
            ? `${SidebarConfig.COLLAPSED_WIDTH - SidebarConfig.COLLAPSER_OFFSET}px`
            : `${SidebarConfig.INITIAL_WIDTH - SidebarConfig.COLLAPSER_OFFSET}px`;
        }
      }),
      distinctUntilChanged()
    );

    this.collapserButtonRotated$ = combineLatest([
      this.themeService.isMobileView$,
      this.themeService.isDesktopSidebarCollapsed$,
      this.themeService.isMobileSidebarVisible$
    ]).pipe(
      map(([isMobile, isDesktopCollapsed, isMobileVisible]) =>
        isMobile ? isMobileVisible : isDesktopCollapsed
      ),
      distinctUntilChanged()
    );
  }

  ngOnInit(): void {}

  toggleSidebar(): void {
    this.themeService.toggleSidebar();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}