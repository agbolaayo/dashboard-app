import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SidebarComponent } from './sidebar.component';
import { ThemeService } from '../../../../core/services/theme.service';
import { ImagePaths, DefaultUser } from '../../../../core/constants/dashboard.constants';
import { MenuItem, UserProfile } from '../../../../core/types/dashboard.types';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';


class MockThemeService {
  isDesktopSidebarCollapsed$ = new BehaviorSubject<boolean>(false);
  isMobileSidebarVisible$ = new BehaviorSubject<boolean>(false);
  isMobileView$ = new BehaviorSubject<boolean>(false);
  desktopSidebarCurrentWidth = 250;

  toggleSidebar(): void {}
  toggleDesktopSidebarCollapse(): void {
    this.isDesktopSidebarCollapsed$.next(!this.isDesktopSidebarCollapsed$.value);
  }
  toggleMobileSidebarVisibility(): void {
    this.isMobileSidebarVisible$.next(!this.isMobileSidebarVisible$.value);
  }
}

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let themeService: ThemeService;

  const mockTopMenuItems: MenuItem[] = [
    { id: 'tm1', label: 'Top Item 1', iconPath: ImagePaths.MENU_1, link: '/top1' },
    { id: 'tm2', label: 'Top Item 2', iconPath: ImagePaths.MENU_2, link: '/top2', active: true },
  ];
  const mockBottomMenuItems: MenuItem[] = [
    { id: 'bm1', label: 'Bottom Item 1', iconPath: ImagePaths.MENU_3, link: '/bottom1' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [CommonModule],
      providers: [
        { provide: ThemeService, useClass: MockThemeService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);

    component.topMenuItems = [...mockTopMenuItems];
    component.bottomMenuItems = [...mockBottomMenuItems];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the logo', () => {
    const logoImg = fixture.debugElement.query(By.css('.logo-full img'));
    expect(logoImg).toBeTruthy();
    expect(logoImg.nativeElement.src).toContain(ImagePaths.LOGO_FULL);
  });

  it('should render top menu items', () => {
    const menuItemElements = fixture.debugElement.queryAll(By.css('.sidebar-top-content .menu-item'));
    expect(menuItemElements.length).toBe(mockTopMenuItems.length);
    expect(menuItemElements[0].nativeElement.textContent).toContain('Top Item 1');
    expect(menuItemElements[1].nativeElement.textContent).toContain('Top Item 2');
  });

  it('should render bottom menu items', () => {
    const menuItemElements = fixture.debugElement.queryAll(By.css('.sidebar-bottom-content .menu-group .menu-item'));
    expect(menuItemElements.length).toBe(mockBottomMenuItems.length);
    expect(menuItemElements[0].nativeElement.textContent).toContain('Bottom Item 1');
  });

  it('should display user profile information', () => {
    const userNameEl = fixture.debugElement.query(By.css('.user-name'));
    const userRoleEl = fixture.debugElement.query(By.css('.user-role'));
    const userAvatarEl = fixture.debugElement.query(By.css('.user-avatar'));

    expect(userNameEl.nativeElement.textContent).toContain(DefaultUser.name);
    expect(userRoleEl.nativeElement.textContent).toContain(DefaultUser.role);
    expect(userAvatarEl.nativeElement.src).toContain(DefaultUser.avatar);
  });

  it('should have a logout button', () => {
    const logoutButton = fixture.debugElement.query(By.css('.logout-icon-container'));
    expect(logoutButton).toBeTruthy();
    const logoutIcon = logoutButton.query(By.css('img.logout-icon-svg'));
    expect(logoutIcon.nativeElement.src).toContain(ImagePaths.LOGOUT_ICON);
  });

  it('should call logout method when logout button is clicked', () => {
    spyOn(component, 'logout');
    const logoutButton = fixture.debugElement.query(By.css('.logout-icon-container'));
    logoutButton.triggerEventHandler('click', null);
    expect(component.logout).toHaveBeenCalled();
  });

   it('should call logout method when logout button is activated by Enter key', () => {
    spyOn(component, 'logout');
    const logoutButton = fixture.debugElement.query(By.css('.logout-icon-container'));
    logoutButton.triggerEventHandler('keydown.enter', new KeyboardEvent('keydown', {key: 'Enter'}));
    expect(component.logout).toHaveBeenCalled();
  });

  it('should correctly track MenuItem by id', () => {
    const testItem: MenuItem = { id: 'testId', label: 'Test', iconPath: 'test.svg' };
    expect(component.trackById(0, testItem)).toBe('testId');
  });

  it('should set menu item active on click', () => {
    const firstTopMenuItemLink = fixture.debugElement.query(By.css('.sidebar-top-content .menu-item:not(.active) a.menu-item-link'));
    const firstTopMenuItem = component.topMenuItems.find(item => !item.active);

    expect(firstTopMenuItem?.active).toBeFalsy();
    firstTopMenuItemLink.triggerEventHandler('click', null);
    fixture.detectChanges();

    const newlyActiveMenuItem = fixture.debugElement.query(By.css('.sidebar-top-content .menu-item.active a.menu-item-link'));
    expect(firstTopMenuItem?.active).toBeTrue();
    expect(newlyActiveMenuItem.nativeElement.textContent).toContain(firstTopMenuItem?.label);
  });
});
