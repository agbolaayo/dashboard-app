import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SidebarConfig } from '../constants/dashboard.constants';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDesktopSidebarCollapsedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isDesktopSidebarCollapsed$: Observable<boolean> = this.isDesktopSidebarCollapsedSubject.asObservable();

  private isMobileSidebarVisibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isMobileSidebarVisible$: Observable<boolean> = this.isMobileSidebarVisibleSubject.asObservable();

  private isMobileViewSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.checkIsMobileView());
  public isMobileView$: Observable<boolean> = this.isMobileViewSubject.asObservable();

  constructor() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  private checkIsMobileView(): boolean {
    return window.innerWidth <= SidebarConfig.MOBILE_BREAKPOINT;
  }

  private handleResize(): void {
    const mobileView = this.checkIsMobileView();
    if (this.isMobileViewSubject.value !== mobileView) {
      this.isMobileViewSubject.next(mobileView);
    }

    if (!mobileView && this.isMobileSidebarVisibleSubject.value) {
      this.isMobileSidebarVisibleSubject.next(false);
    }
  }

  public toggleDesktopSidebarCollapse(): void {
    if (!this.checkIsMobileView()) {
      this.isDesktopSidebarCollapsedSubject.next(!this.isDesktopSidebarCollapsedSubject.value);
    }
  }

  public toggleMobileSidebarVisibility(): void {
    if (this.checkIsMobileView()) {
      this.isMobileSidebarVisibleSubject.next(!this.isMobileSidebarVisibleSubject.value);
    }
  }

  public toggleSidebar(): void {
    if (this.checkIsMobileView()) {
      this.toggleMobileSidebarVisibility();
    } else {
      this.toggleDesktopSidebarCollapse();
    }
  }

  get desktopSidebarCurrentWidth(): number {
    return this.isDesktopSidebarCollapsedSubject.value ? SidebarConfig.COLLAPSED_WIDTH : SidebarConfig.INITIAL_WIDTH;
  }
}