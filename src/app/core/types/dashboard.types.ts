export type MenuItem = {
  id: string;
  label: string;
  iconPath: string;
  active?: boolean;
  action?: () => void;
  link?: string;
};

export type UserProfile = {
  name: string;
  role: string;
  avatarUrl: string;
};

export type InfoCardDetailValue = string | { iconPath?: string; text: string };

export type InfoCardDetail = {
  label: string;
  value: InfoCardDetailValue;
  isFixedHight?: boolean;
  customStyle?: Record<string, string>;
};

export type RemediationItemDetail = {
  iconPath: string;
  iconBgColor?: string;
  primaryLabel: string;
  secondaryLabel: string;
  description: string;
  dividerImagePath?: string;
};

export type RemediationEntry = {
  title: string;
  items: RemediationItemDetail[];
  additionalDetails?: string;
};

export type AttackNodeIconDetails = {
  path: string;
  style?: Record<string, string>;
};

export type AttackNodeStatusBadge = {
  bgColor: string;
  iconPath: string;
  isOverlay?: boolean;
  customShieldStyle?: Record<string, string>;
};

export type HoverPositionConfig = {
  vertical?: { edge: 'top' | 'bottom'; offset: number };
  horizontal?: { edge: 'left' | 'right'; offset: number };
};

export type AttackNode = {
  id: string;
  type: 'single' | 'grouped-vertical';
  primaryText: string;
  secondaryText?: string;
  icon: AttackNodeIconDetails | string;
  statusBadge?: AttackNodeStatusBadge;
  nodes?: AttackNode[];
  nodeStyle?: Record<string, string>;
  iconWrapperStyle?: Record<string, string>;
  textContainerStyle?: Record<string, string>;
  primaryTextStyle?: Record<string, string>;
  secondaryTextStyle?: Record<string, string>;
  hoverPositionConfig?: HoverPositionConfig;
};


export type AttackPathConnectionType = 'connector-image' | 'connector-group';

export type AttackPathConnection = {
  type: AttackPathConnectionType;
  imagePath: string;
  style?: Record<string, string>;
};

export type AttackPathSegment = AttackNode | AttackPathConnection;


export type TableRowAsset = {
  iconPath: string;
  iconBgColor: string;
  primaryText: string;
  secondaryText: string;
};

export type TableRowRisk = {
  statusText: string;
  statusBgColor: string;
  statusTextColor: string;
};

export type TableRow = {
  id: string | number;
  asset: TableRowAsset;
  risk: TableRowRisk;
};

export type TableHeader = {
  key: string;
  label: string;
  customStyle?: Record<string, string>;
};

export type SeverityTagType = 'critical' | 'high' | 'medium' | 'low';

export type SeverityTag = {
  type: SeverityTagType;
  label: string;
  iconPath: string;
};

export type ChartLegendColorClass = 'critical' | 'high' | 'medium' | 'low';

export type ChartLegendItem = {
  id: string;
  label: string;
  count: number;
  colorClass: ChartLegendColorClass;
  colorValue: string;
  visible?: boolean;
};

export interface ModalData {
  title: string;
  contentHtml: string;
}