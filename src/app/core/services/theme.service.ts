import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SidebarConfig } from '../constants/dashboard.constants';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isSidebarCollapsedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isSidebarCollapsed$: Observable<boolean> = this.isSidebarCollapsedSubject.asObservable();

  private isMobileSidebarVisibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isMobileSidebarVisible$: Observable<boolean> = this.isMobileSidebarVisibleSubject.asObservable();

  constructor() {
    this.handleResize();
  }

  toggleSidebarCollapse(): void {
    this.isSidebarCollapsedSubject.next(!this.isSidebarCollapsedSubject.value);
  }

  toggleMobileSidebarVisibility(): void {
    this.isMobileSidebarVisibleSubject.next(!this.isMobileSidebarVisibleSubject.value);
    // If desktop collapser is visible and sidebar is manually collapsed, respect that
    if (window.innerWidth <= 1200 && this.isSidebarCollapsedSubject.value && this.isMobileSidebarVisibleSubject.value) {
        // This logic might need refinement depending on exact desired behavior on mobile when desktop is collapsed
    }
  }

  get sidebarCurrentWidth(): number {
    return this.isSidebarCollapsedSubject.value ? SidebarConfig.COLLAPSED_WIDTH : SidebarConfig.INITIAL_WIDTH;
  }

  private handleResize(): void {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1200) {
        if (this.isMobileSidebarVisibleSubject.value) {
          this.isMobileSidebarVisibleSubject.next(false);
        }
      }
    });
  }
}