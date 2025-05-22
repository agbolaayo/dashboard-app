import { Component } from '@angular/core';
import {
  AttackPathSegment,
  AttackNode,
  SeverityTag,
  AttackNodeIconDetails,
  AttackPathConnection
} from '../../../../core/types/dashboard.types';
import { ImagePaths as IP } from '../../../../core/constants/dashboard.constants';

@Component({
  selector: 'app-attack-path-card',
  templateUrl: './attack-path-card.component.html',
  standalone: false
})
export class AttackPathCardComponent {
  public imagePaths = IP;

  mainTitle: string = "Lorem Lorem Lorem";
  // cardDividerPath is used in the template directly via imagePaths.CARD_DIVIDER
  // Ensure all image paths used in the template are accessed via `this.imagePaths` or just `imagePaths` in the template.

  attackPathSegments: AttackPathSegment[] = [
    {
      id: 'node1', type: 'single', primaryText: 'Loremipsumm', secondaryText: 'FW',
      icon: { path: this.imagePaths.VENETIAN_MASK_ICON, style: {backgroundColor: 'var(--red-50)'} },
      statusBadge: { bgColor: 'var(--purple-500)', iconPath: this.imagePaths.BADGE_ICON_GROUP, isOverlay: true },
      primaryTextStyle: { marginRight: '-10.25px' },
      secondaryTextStyle: { color: '#ffffff' }
    },
    { type: 'connector-image', imagePath: this.imagePaths.PATH_CONNECTOR_IMAGE },
    { id: 'node2', type: 'single', primaryText: 'Loremipsu', icon: this.imagePaths.LOAD_BALANCER_ICON },
    { type: 'connector-image', imagePath: this.imagePaths.PATH_CONNECTOR_IMAGE },
    { id: 'node3', type: 'single', primaryText: 'Loremipsu', icon: this.imagePaths.LOAD_BALANCER_ICON },
    { type: 'connector-group', imagePath: this.imagePaths.PATH_CONNECTOR_GROUP, style: { width: '208px', height: '109.05px' } },
    {
      id: 'node4-group-container',
      type: 'grouped-vertical',
      primaryText: '',
      icon: { path: this.imagePaths.SERVER_ICON_NO_BG, style: {display: 'none'} },
      nodes: [
        {
          id: 'node4-1', type: 'single', primaryText: 'Loremipsumdolorsit', secondaryText: '192.168.1.1',
          icon: { path: this.imagePaths.SERVER_ICON_NO_BG, style: {backgroundColor: 'var(--blue-100)'} },
          statusBadge: {
            bgColor: 'var(--red-700)',
            iconPath: this.imagePaths.SHIELD_X_ICON,
            isOverlay: false,
            customShieldStyle: { left:'28px' }
          },
          nodeStyle: { width:'100%', padding:'0', borderRadius:'0'},
          iconWrapperStyle: { width:'100%' },
          textContainerStyle: { width:'100%' },
          primaryTextStyle: { marginLeft: '-27.75px', marginRight: '-27.75px'},
          secondaryTextStyle: { color: 'var(--gray-soft500)'}
        },
        {
          id: 'node4-2', type: 'single', primaryText: 'Loremipsumdolorsit002', secondaryText: '192.168.1.2',
          icon: { path: this.imagePaths.SERVER_ICON_NO_BG, style: {backgroundColor: 'var(--blue-100)'} },
          statusBadge: {
            bgColor: 'var(--red-700)',
            iconPath: this.imagePaths.SHIELD_X_ICON,
            isOverlay: false,
            customShieldStyle: { left:'28px' }
           },
          nodeStyle: { width:'100%', padding:'0', borderRadius:'0'},
          iconWrapperStyle: { width:'100%' },
          textContainerStyle: { width:'100%' },
          primaryTextStyle: { marginLeft: '-40.25px', marginRight: '-40.25px'},
          secondaryTextStyle: { color: 'var(--gray-soft500)'}
        }
      ]
    }
  ];

  severityTags: SeverityTag[] = [
    { type: 'critical', label: 'Lorem', iconPath: this.imagePaths.SHIELD_CRITICAL },
    { type: 'high', label: 'Lorem', iconPath: this.imagePaths.SHIELD_MEDIUM },
    { type: 'low', label: 'Lorem', iconPath: this.imagePaths.SHIELD_LOW }
  ];

  relatedAssetsTitle: string = "Lorem Ipsum Dolor Sit"; // This title precedes the table and chart

  constructor() { }

  isAttackNode(segment: AttackPathSegment): segment is AttackNode {
    return 'icon' in segment && (segment.type === 'single' || segment.type === 'grouped-vertical');
  }

  isAttackConnection(segment: AttackPathSegment): segment is AttackPathConnection {
    return 'imagePath' in segment && (segment.type === 'connector-image' || segment.type === 'connector-group');
  }

  isIconDetails(icon: string | AttackNodeIconDetails): icon is AttackNodeIconDetails {
    return typeof icon === 'object' && icon !== null && 'path' in icon;
  }

  getIconPath(iconInput: AttackNodeIconDetails | string): string {
    return this.isIconDetails(iconInput) ? iconInput.path : iconInput;
  }

  getIconStyle(iconInput: AttackNodeIconDetails | string): Record<string, string> | null {
    return this.isIconDetails(iconInput) && iconInput.style ? iconInput.style : null;
  }

  trackById(index: number, item: AttackPathSegment | SeverityTag | AttackNode): string | number {
    return item && (item as any).id ? (item as any).id : index;
  }
}