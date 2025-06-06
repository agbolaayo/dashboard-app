import { Component, HostListener, ElementRef, Renderer2, ChangeDetectorRef, ViewChild, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  AttackPathSegment,
  AttackNode,
  SeverityTag,
  AttackNodeIconDetails,
  AttackPathConnection,
  ModalData,
  HoverPositionConfig
} from '../../../../core/types/dashboard.types';
import { ImagePaths as IP, DashboardUIText } from '../../../../core/constants/dashboard.constants';
import { ModalService } from '../../../../core/services/modal.service';

@Component({
  selector: 'app-attack-path-card',
  templateUrl: './attack-path-card.component.html',
  standalone: false
})
export class AttackPathCardComponent {
  public imagePaths = IP;

  mainTitle: string = DashboardUIText.ATTACK_PATH_MAIN_TITLE;
  private hoverWindowEstimatedHeight = 200;

  attackPathSegments: AttackPathSegment[] = [
    {
      id: 'node1', type: 'single', primaryText: 'Loremipsumm',
      icon: { path: this.imagePaths.VENETIAN_MASK_ICON, style: {backgroundColor: 'var(--red-50)'} },
      statusBadge: { bgColor: 'var(--purple-500)', iconPath: this.imagePaths.BADGE_ICON_GROUP, isOverlay: true },
      primaryTextStyle: { marginRight: '-10.25px' },
      secondaryTextStyle: { color: '#ffffff' },
      hoverPositionConfig: {
        vertical: { edge: 'bottom', offset: 10 },
        horizontal: { edge: 'left', offset: -5 }
      }
    },
    { type: 'connector-image', imagePath: this.imagePaths.PATH_CONNECTOR_IMAGE },
    {
      id: 'node2', type: 'single', primaryText: 'Loremipsu', icon: this.imagePaths.LOAD_BALANCER_ICON,
      hoverPositionConfig: {
        vertical: { edge: 'bottom', offset: 5 },
        horizontal: { edge: 'left', offset: -150 }
      }
    },
    { type: 'connector-image', imagePath: this.imagePaths.PATH_CONNECTOR_IMAGE },
    { id: 'node3', type: 'single', primaryText: 'Loremipsu', icon: this.imagePaths.LOAD_BALANCER_ICON ,
      hoverPositionConfig: {
        vertical: { edge: 'bottom', offset: 10 },
        horizontal: { edge: 'left', offset: -125 }
      }
    },
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
          secondaryTextStyle: { color: 'var(--gray-soft500)'},
          hoverPositionConfig: {
            vertical: { edge: 'top', offset: 200 },
            horizontal: { edge: 'left', offset: -280 }
          }
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
          secondaryTextStyle: { color: 'var(--gray-soft500)'},
          hoverPositionConfig: {
            vertical: { edge: 'bottom', offset: -55 },
            horizontal: { edge: 'left', offset: -300 }
          }
        }
      ]
    }
  ];

  severityTags: SeverityTag[] = [
    { type: 'critical', label: 'Lorem', iconPath: this.imagePaths.SHIELD_CRITICAL },
    { type: 'high', label: 'Lorem', iconPath: this.imagePaths.SHIELD_MEDIUM },
    { type: 'low', label: 'Lorem', iconPath: this.imagePaths.SHIELD_LOW }
  ];

  relatedAssetsTitle: string = DashboardUIText.ATTACK_PATH_RELATED_ASSETS_TITLE;

  public hoverContent: SafeHtml | null = null;
  public showHoverWindow: boolean = false;
  public hoverWindowPosition: { top: string, left: string } = { top: '0px', left: '0px' };

  private vulnerabilityCardHtmlMap: Record<string, {title: string, html: string}> = {
    'Loremipsumdolorsit': {
      title: 'Loremipsumdolorsit',
      html: `
        <div class="card-base card-1">
          <div class="card-content-wrapper">
            <div class="card-header-section">
              <div class="card-info-block">
                <div class="card-icon-title-row">
                  <div class="card-icon-container">
                    <div class="card-icon-bg"></div>
                    <img class="card-icon-main-svg" src="assets/images/lucide-server0.svg" alt="Server Icon" />
                    <div class="card-icon-indicator-bg"></div>
                    <img class="card-icon-indicator-svg" src="assets/images/lucide-shield-x0.svg" alt="Shield Icon" />
                  </div>
                  <div class="card-title-subtitle-block">
                    <div class="card-title-text">Loremipsumdolorsit</div>
                    <div class="card-subtitle-text">192.168.1.1</div>
                  </div>
                </div>
                <div class="card-detail-row">
                  <img class="card-detail-icon" src="assets/images/lucide-receipt-text0.svg" alt="Receipt Icon" />
                  <div class="card-detail-label">Lorem:</div>
                  <div class="card-tag card-tag-yellow">
                    <div class="card-tag-text card-tag-yellow-text">Lorem “ipsum"</div>
                  </div>
                </div>
                <div class="card-detail-row">
                  <div class="card-detail-label">Loremipsum</div>
                  <div class="card-tag card-tag-blue">
                    <div class="card-tag-text card-tag-blue-text">lorem 1234,5678</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
    },
    'Loremipsumdolorsit002': {
      title: 'Loremipsumdolorsit002',
      html: `
        <div class="card-base card-2">
          <div class="card-content-wrapper">
            <div class="card-header-section">
              <div class="card-info-block">
                <div class="card-icon-title-row">
                  <div class="card-icon-container">
                    <div class="card-icon-bg"></div>
                    <img class="card-icon-main-svg" src="assets/images/lucide-server0.svg" alt="Server Icon" />
                    <div class="card-icon-indicator-bg"></div>
                    <img class="card-icon-indicator-svg" src="assets/images/lucide-shield-x0.svg" alt="Shield Icon" />
                  </div>
                  <div class="card-title-subtitle-block">
                    <div class="card-title-text">Loremipsumdolorsit002</div>
                    <div class="card-subtitle-text">192.168.1.2</div>
                  </div>
                </div>
                <div class="card-detail-row">
                  <img class="card-detail-icon" src="assets/images/lucide-receipt-text0.svg" alt="Receipt Icon" />
                  <div class="card-detail-label">Lorem:</div>
                  <div class="card-tag card-tag-yellow">
                    <div class="card-tag-text card-tag-yellow-text">Lorem “ipsum"</div>
                  </div>
                </div>
                <div class="card-detail-row">
                  <div class="card-detail-label">Loremipsum</div>
                  <div class="card-tag card-tag-blue">
                    <div class="card-tag-text card-tag-blue-text">lorem 1234,5678</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
    },
    'Loremipsu': {
      title: 'Loremipsu',
      html: `
        <div class="card-base card-3">
          <div class="card-content-wrapper">
            <div class="card-header-section">
              <div class="card-info-block">
                <div class="card-icon-title-row">
                  <div class="card-icon-container">
                    <div class="card-icon-bg"></div>
                    <img class="card-icon-main-svg" src="assets/images/lucide-server0.svg" alt="Server Icon" />
                  </div>
                  <div class="card-title-subtitle-block">
                    <div class="card-title-text">Loremipsu</div>
                  </div>
                </div>
                <div class="card-detail-row">
                  <img class="card-detail-icon" src="assets/images/lucide-receipt-text0.svg" alt="Receipt Icon" />
                  <div class="card-detail-label">Lorem:</div>
                  <div class="card-detail-label">Loremipsum Loremipsum</div>
                  <div class="card-tag card-tag-purple">
                    <div class="card-tag-text card-tag-purple-text">1.2.3.4</div>
                  </div>
                </div>
                <div class="card-detail-row">
                  <div class="card-tag card-tag-purple">
                    <div class="card-tag-text card-tag-purple-text">1.2.3.4</div>
                  </div>
                  <div class="card-detail-label" style="margin-left: 5px;">Loremipsum</div>
                  <div class="card-tag card-tag-purple">
                    <div class="card-tag-text card-tag-purple-text">1.2.3.4</div>
                  </div>
                  <div class="card-tag card-tag-purple">
                    <div class="card-tag-text card-tag-purple-text">1.2.3.4</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
    },
     'Loremipsumm': {
      title: 'Loremipsumm',
      html: `
        <div class="issue-summary-card">
          <div class="issue-summary-card-content">
            <div class="issue-summary-card-title-banner">
              <div class="issue-summary-card-title">Lorem Ipsum Dolor Sit</div>
            </div>
            <div class="issue-summary-tag-cell tag-cell-red-type1 tag-cell-pos1">
              <div class="issue-summary-tag tag-style-red">
                <div class="issue-summary-tag-text text-style-red">1.2.3.4</div>
              </div>
            </div>
            <div class="issue-summary-tag-cell tag-cell-red-type2 tag-cell-pos2">
              <div class="issue-summary-tag tag-style-red">
                <div class="issue-summary-tag-text text-style-red">1.2.3.4</div>
              </div>
            </div>
            <div class="issue-summary-tag-cell tag-cell-red-type2 tag-cell-pos3">
              <div class="issue-summary-tag tag-style-red">
                <div class="issue-summary-tag-text text-style-red">1.2.3.4</div>
              </div>
            </div>
            <div class="issue-summary-tag-cell tag-cell-red-type1 tag-cell-pos4">
              <div class="issue-summary-tag tag-style-red">
                <div class="issue-summary-tag-text text-style-red">1.2.3.4</div>
              </div>
            </div>
            <div class="issue-summary-tag-cell tag-cell-red-type2 tag-cell-pos5">
              <div class="issue-summary-tag tag-style-red">
                <div class="issue-summary-tag-text text-style-red">1.2.3.4</div>
              </div>
            </div>
            <div class="issue-summary-tag-cell tag-cell-red-type2 tag-cell-pos6">
              <div class="issue-summary-tag tag-style-red">
                <div class="issue-summary-tag-text text-style-red">1.2.3.4</div>
              </div>
            </div>
            <div class="issue-summary-tag-cell empty-cell-placeholder empty-cell-pos1"></div>
            <div class="issue-summary-tag-cell empty-cell-placeholder empty-cell-pos2"></div>
            <div class="issue-summary-tag-cell empty-cell-placeholder empty-cell-pos3"></div>
            <div class="issue-summary-tag-cell empty-cell-placeholder empty-cell-pos4"></div>
            <div class="issue-summary-final-tag-container">
              <div class="issue-summary-tag tag-style-purple">
                <div class="issue-summary-tag-text text-style-purple">Lorem: 1.2.3.4</div>
              </div>
            </div>
          </div>
        </div>
      `
    },
    'Loremipsum (Card 4)': {
        title: 'Loremipsum Details',
        html: `
        <div class="card-base card-4">
            <div class="card-content-wrapper">
                <div class="card-header-section">
                    <div class="card-info-block">
                        <div class="card-icon-title-row">
                            <div class="card-icon-container">
                                <div class="card-icon-bg"></div>
                                <img class="card-icon-main-svg" src="assets/images/lucide-server0.svg" alt="Server Icon" />
                            </div>
                            <div class="card-title-subtitle-block">
                                <div class="card-title-text">Loremipsum</div>
                            </div>
                        </div>
                        <div class="card-detail-row">
                            <img class="card-detail-icon" src="assets/images/lucide-receipt-text0.svg" alt="Receipt Icon" />
                            <div class="card-detail-label">Lorem:</div>
                            <div class="card-tag card-tag-yellow">
                                <div class="card-tag-text card-tag-yellow-text">Lorem “ipsum"</div>
                            </div>
                            <div class="card-tag card-tag-green">
                                <div class="card-tag-text card-tag-green-text" style="font-family: var(--font-public-sans); font-weight: 700; font-size:15px;">Lorem</div>
                            </div>
                            <div class="card-detail-label">Loremipsum Loremipsum</div>
                        </div>
                        <div class="card-detail-row">
                            <div class="card-tag card-tag-purple">
                                <div class="card-tag-text card-tag-purple-text">1.2.3.4</div>
                            </div>
                            <div class="card-detail-label" style="margin-left:5px;">Loremipsum</div>
                            <div class="card-tag card-tag-purple">
                                <div class="card-tag-text card-tag-purple-text">1.2.3.4</div>
                            </div>
                            <div class="card-tag card-tag-purple">
                                <div class="card-tag-text card-tag-purple-text">1.2.3.4</div>
                            </div>
                            <div class="card-tag card-tag-blue">
                                <div class="card-tag-text card-tag-blue-text">lorem 1234,5678</div>
                            </div>
                        </div>
                        <div class="card-detail-row">
                            <img class="card-detail-icon" src="assets/images/lucide-receipt-text1.svg" alt="Receipt Icon" />
                            <div class="card-detail-label">Lorem:</div>
                            <div class="card-tag card-tag-yellow">
                                <div class="card-tag-text card-tag-yellow-text">Lorem “ipsum"</div>
                            </div>
                            <div class="card-detail-label">Loremipsum Loremipsum</div>
                        </div>
                        <div class="card-detail-row">
                            <div class="card-tag card-tag-purple">
                                <div class="card-tag-text card-tag-purple-text">1.2.3.4</div>
                            </div>
                            <div class="card-tag card-tag-purple">
                                <div class="card-tag-text card-tag-purple-text">1.2.3.4</div>
                            </div>
                            <div class="card-detail-label" style="margin-left:5px;">Loremipsum Loremipsum</div>
                            <div class="card-tag card-tag-purple">
                                <div class="card-tag-text card-tag-purple-text">1.2.3.4</div>
                            </div>
                            <div class="card-tag card-tag-purple">
                                <div class="card-tag-text card-tag-purple-text">1.2.3.4</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }
  };

  constructor(
    private modalService: ModalService,
    private sanitizer: DomSanitizer,
    private elRef: ElementRef<HTMLElement>
  ) { }

  openVulnerabilityModal(node: AttackNode): void {
    const nodeKey = node.primaryText;
    let cardData = this.vulnerabilityCardHtmlMap[nodeKey];

    if (node.id === 'node3' && nodeKey === 'Loremipsu') {
        cardData = {
            title: 'Loremipsu (WAN)',
            html: `
              <div class="card-base card-3">
                <div class="card-content-wrapper">
                  <div class="card-header-section">
                    <div class="card-info-block">
                      <div class="card-icon-title-row">
                        <div class="card-icon-container">
                          <div class="card-icon-bg"></div>
                          <img class="card-icon-main-svg" src="assets/images/lucide-server0.svg" alt="Server Icon" />
                        </div>
                        <div class="card-title-subtitle-block">
                          <div class="card-title-text">Loremipsu</div>
                        </div>
                      </div>
                      <div class="card-detail-row">
                        <img class="card-detail-icon" src="assets/images/lucide-receipt-text0.svg" alt="Receipt Icon" />
                        <div class="card-detail-label">Lorem:</div>
                        <div class="card-detail-label">Loremipsum Loremipsum</div>
                        <div class="card-tag card-tag-purple">
                          <div class="card-tag-text card-tag-purple-text">1.2.3.4</div>
                        </div>
                      </div>
                      <div class="card-detail-row">
                        <div class="card-tag card-tag-purple">
                          <div class="card-tag-text card-tag-purple-text">1.2.3.4</div>
                        </div>
                        <div class="card-detail-label" style="margin-left: 5px;">Loremipsum</div>
                        <div class="card-tag card-tag-purple">
                          <div class="card-tag-text card-tag-purple-text">1.2.3.4</div>
                        </div>
                        <div class="card-tag card-tag-purple">
                          <div class="card-tag-text card-tag-purple-text">1.2.3.4</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `
        };
    }


    if (!cardData) {
      cardData = {
        title: `${nodeKey} Details`,
        html: `<div class="card-base"><div class="card-content-wrapper"><p>No specific card HTML pre-configured for ${nodeKey}.</p><p>ID: ${node.id}</p></div></div>`
      };
    }

    const modalData: ModalData = {
      title: cardData.title,
      contentHtml: cardData.html
    };
    this.modalService.open(modalData);
  }

  onNodeMouseEnter(event: MouseEvent, node: AttackNode): void {
    const nodeKey = node.primaryText;
    let cardData = this.vulnerabilityCardHtmlMap[nodeKey];

     if (node.id === 'node3' && nodeKey === 'Loremipsu') {
        cardData = this.vulnerabilityCardHtmlMap['Loremipsu (WAN)'] || this.vulnerabilityCardHtmlMap['Loremipsu'];
     }


    if (!cardData && node.id.startsWith('node4')) {
       cardData = this.vulnerabilityCardHtmlMap[nodeKey];
    }


    if (cardData) {
      this.hoverContent = this.sanitizer.bypassSecurityTrustHtml(cardData.html);
      const targetElement = event.currentTarget as HTMLElement;
      const targetRect = targetElement.getBoundingClientRect();
      const componentHostElement = this.elRef.nativeElement;
      const componentHostRect = componentHostElement.getBoundingClientRect();

      const scrollableAncestor = componentHostElement.closest('app-content-panel');
      const scrollTop = scrollableAncestor ? scrollableAncestor.scrollTop : 0;

      let calculatedTop: number;
      let calculatedLeft: number;

      const config = node.hoverPositionConfig;

      if (config?.vertical) {
        if (config.vertical.edge === 'bottom') {
          calculatedTop = (targetRect.bottom - componentHostRect.top + scrollTop) + config.vertical.offset;
        } else {
          calculatedTop = (targetRect.top - componentHostRect.top + scrollTop) - this.hoverWindowEstimatedHeight + config.vertical.offset;
        }
      } else {
        calculatedTop = (targetRect.bottom - componentHostRect.top + scrollTop) + 5;
      }

      if (config?.horizontal) {
        if (config.horizontal.edge === 'left') {
          calculatedLeft = (targetRect.left - componentHostRect.left) + config.horizontal.offset;
        } else {
          calculatedLeft = (targetRect.right - componentHostRect.left) + config.horizontal.offset;
        }
      } else {
        calculatedLeft = targetRect.left - componentHostRect.left;
      }

      if (calculatedLeft < 0) {
        calculatedLeft = 5;
      }

      this.hoverWindowPosition = {
        top: `${calculatedTop}px`,
        left: `${calculatedLeft}px`
      };
      this.showHoverWindow = true;
    } else {
      this.onNodeMouseLeave();
    }
  }

  onNodeMouseLeave(): void {
    this.showHoverWindow = false;
    this.hoverContent = null;
  }

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

  trackById(index: number, item: AttackPathSegment | SeverityTag | AttackNode): string {
    if (item && (item as AttackNode).id) {
      return (item as AttackNode).id;
    }
    if (item && (item as SeverityTag).type) {
      return (item as SeverityTag).type + '-' + (item as SeverityTag).label;
    }
    return index.toString();
  }
}
