export type MenuItem = {
  id: string;
  label: string;
  iconPath: string;
  active?: boolean;
  action?: () => void;
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
  // Added to match usage in AttackPathCardComponent for grouped server nodes
  isOverlay?: boolean; // To differentiate between venetian mask overlay and server shield overlay
  customShieldStyle?: Record<string, string>; // For specific positioning like left: '28px'
};

export type AttackNode = {
  id: string;
  type: 'single' | 'grouped-vertical';
  primaryText: string;
  secondaryText?: string;
  icon: AttackNodeIconDetails | string; // Required for all AttackNode types
  statusBadge?: AttackNodeStatusBadge;
  nodes?: AttackNode[]; // Only for type 'grouped-vertical'
  nodeStyle?: Record<string, string>;
  iconWrapperStyle?: Record<string, string>;
  textContainerStyle?: Record<string, string>;
  primaryTextStyle?: Record<string, string>;
  secondaryTextStyle?: Record<string, string>;
};

// Ensure AttackPathConnection is defined and exported
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