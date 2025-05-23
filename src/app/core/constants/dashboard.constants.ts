// Using object literals for enums as requested
export const ImagePaths = {
  MENU_7: 'assets/images/menu-7.svg',
  MENU_3: 'assets/images/menu-3.svg',
  MENU_1: 'assets/images/menu-1.svg',
  MENU_ACTIVE: 'assets/images/menu.svg',
  MENU_5: 'assets/images/menu-5.svg',
  MENU_6: 'assets/images/menu-6.svg',
  MENU_2: 'assets/images/menu-2.svg',
  MENU_4: 'assets/images/menu-4.svg',
  MENU_8: 'assets/images/menu-8.svg',
  SIDEBAR_DIVIDER: 'assets/images/vector-1.svg',
  USER_AVATAR: 'assets/images/logo--1--1.png',
  LOGOUT_ICON: 'assets/images/outlined.svg',
  SIDEBAR_COLLAPSER: 'assets/images/collapser.svg',
  CARD_DIVIDER: 'assets/images/vector-1348.svg',
  CHECK_ICON: 'assets/images/lucide-check.svg',
  SERVER_ICON_BLUE_BG: 'assets/images/lucide-server-2.svg', // Example, use appropriate names
  REMEDIATION_DIVIDER_LINE: 'assets/images/line-61.svg',
  VENETIAN_MASK_ICON: 'assets/images/lucide-venetian-mask.svg',
  BADGE_ICON_GROUP: 'assets/images/group.png',
  PATH_CONNECTOR_IMAGE: 'assets/images/image.svg',
  LOAD_BALANCER_ICON: 'assets/images/logo-oad-balancer.svg',
  PATH_CONNECTOR_GROUP: 'assets/images/group-1261165296.png',
  SERVER_ICON_NO_BG: 'assets/images/lucide-server.svg', // Example
  SHIELD_X_ICON: 'assets/images/lucide-shield-x.svg',
  SHIELD_CRITICAL: 'assets/images/shield-critical.svg',
  SHIELD_MEDIUM: 'assets/images/shield-medium.svg', // Assuming this is for high severity in HTML
  SHIELD_LOW: 'assets/images/shield-low.svg',
  ASSET_TABLE_ICON: 'assets/images/lucide-server-1.svg', // Example
  PAGINATION_CHEVRON_LEFT: 'assets/images/chevron-right.png', // Note: HTML uses right-pointing for prev
  PAGINATION_CHEVRON_RIGHT: 'assets/images/chevron-right-1.png',
};

export const DefaultUser = {
  name: 'Lorem',
  role: 'Lorem',
  avatar: ImagePaths.USER_AVATAR,
};

export const SidebarConfig = {
  INITIAL_WIDTH: 250,
  COLLAPSED_WIDTH: 80,
  COLLAPSER_OFFSET: 20, // distance from right edge of sidebar
};

export const ChartColors = { // From CSS variables
  CRITICAL: 'rgba(198, 25, 13, 1)', // --red-800
  HIGH: 'rgba(229, 55, 43, 1)', // --red-700
  MEDIUM: 'rgba(235, 166, 34, 1)', // --yellow-600
  LOW: 'rgba(8, 185, 78, 1)', // --green-600
};

export const DoughnutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '90%',
  animation: {
    duration: 0
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: false
    }
  }
};