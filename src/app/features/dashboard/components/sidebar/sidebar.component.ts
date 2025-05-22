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
  // public imagePaths = ImagePaths; // Make available if ImagePaths were directly used in sidebar template

  topMenuItems: MenuItem[] = [
    { id: 'top1', label: 'Lorem', iconPath: ImagePaths.MENU_7 },
    { id: 'top2', label: 'Lorem', iconPath: ImagePaths.MENU_3 },
    { id: 'top3', label: 'Lorem', iconPath: ImagePaths.MENU_1 },
    { id: 'top4', label: 'Lorem', iconPath: ImagePaths.MENU_ACTIVE, active: true },
    { id: 'top5', label: 'Lorem', iconPath: ImagePaths.MENU_5 },
    { id: 'top6', label: 'Lorem', iconPath: ImagePaths.MENU_6 },
    { id: 'top7', label: 'Lorem', iconPath: ImagePaths.MENU_2 },
  ];

  bottomMenuItems: MenuItem[] = [
    { id: 'bottom1', label: 'Lorem', iconPath: ImagePaths.MENU_4 },
    { id: 'bottom2', label: 'Lorem', iconPath: ImagePaths.MENU_8 },
  ];

  userProfile: UserProfile = {
    name: DefaultUser.name,
    role: DefaultUser.role,
    avatarUrl: DefaultUser.avatar,
  };

  sidebarDividerPath: string = ImagePaths.SIDEBAR_DIVIDER;
  logoutIconPath: string = ImagePaths.LOGOUT_ICON;

  constructor(public themeService: ThemeService) {}

  selectMenuItem(selectedItem: MenuItem): void {
    this.topMenuItems.forEach(item => item.active = false);
    this.bottomMenuItems.forEach(item => item.active = false);
    selectedItem.active = true;
    if (selectedItem.action) {
      selectedItem.action();
    }
  }

  logout(): void {
    console.log('Logout clicked');
  }

  // trackById function made public
  public trackById(index: number, item: MenuItem): string {
    return item.id;
  }
}