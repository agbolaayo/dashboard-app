import { Component } from '@angular/core';
import { MenuItem, UserProfile } from '../../../../core/types/dashboard.types';
import { ImagePaths, DefaultUser } from '../../../../core/constants/dashboard.constants';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: false
})
export class SidebarComponent {
  public logoFullPath: string = ImagePaths.LOGO_FULL;
  topMenuItems: MenuItem[] = [
    { id: 'top1', label: 'Lorem', iconPath: ImagePaths.MENU_7, link: '/'},
    { id: 'top2', label: 'Lorem', iconPath: ImagePaths.MENU_3, link: '/' },
    { id: 'top3', label: 'Lorem', iconPath: ImagePaths.MENU_1, link: '/' },
    { id: 'top4', label: 'Lorem', iconPath: ImagePaths.MENU_ACTIVE, link: '/', active: true },
    { id: 'top5', label: 'Lorem', iconPath: ImagePaths.MENU_5, link: '/' },
    { id: 'top6', label: 'Lorem', iconPath: ImagePaths.MENU_6, link: '/' },
    { id: 'top7', label: 'Lorem', iconPath: ImagePaths.MENU_2, link: '/' },
  ];

  bottomMenuItems: MenuItem[] = [
    { id: 'bottom1', label: 'Lorem', iconPath: ImagePaths.MENU_4, link: '/' },
    { id: 'bottom2', label: 'Lorem', iconPath: ImagePaths.MENU_8, link: '/' },
  ];

  userProfile: UserProfile = {
    name: DefaultUser.name,
    role: DefaultUser.role,
    avatarUrl: DefaultUser.avatar,
  };

  sidebarDividerPath: string = ImagePaths.SIDEBAR_DIVIDER;
  logoutIconPath: string = ImagePaths.LOGOUT_ICON;

  constructor(public themeService: ThemeService) {}

  logout(): void {}

  public trackById(index: number, item: MenuItem): string {
    return item.id;
  }
}