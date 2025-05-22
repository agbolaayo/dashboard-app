import { Component } from '@angular/core';
import { InfoCardDetail, RemediationEntry, InfoCardDetailValue } from '../../../../core/types/dashboard.types';
import { ImagePaths } from '../../../../core/constants/dashboard.constants';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  standalone: false
})
export class InfoCardComponent {
  // Make ImagePaths available to the template if needed, though not directly used in this component's template based on errors
  // public imagePaths = ImagePaths;

  cardDividerPath: string = ImagePaths.CARD_DIVIDER;
  checkIconPath: string = ImagePaths.CHECK_ICON;
  serverIconBlueBgPath: string = ImagePaths.SERVER_ICON_BLUE_BG;
  remediationDividerLinePath: string = ImagePaths.REMEDIATION_DIVIDER_LINE;

  descriptionTitle: string = "Description";
  descriptionText: string = "Lorem Ipsum Dolor Sit Amet Consectetur. Aenean Sodales Pellentesque Gravida Nibh Et Magna Faucibus. Dui Commodo Ut Metus Amet Egestas Habitant Viverra. Quisque Fusce Senectus Facilisis Non Diam Leo Nulla Sem Pellentesque. Sit In Vel Sed Cursus Metus Sit Fringilla Vestibulum.";
  extraTitle: string = "Extra";
  extraText: string = "Lorem ipsum dolor sit amet consectetur. Tempus a id adipiscing fames egestas tellus dis pretium tempus. Justo nisl nisl lorem lectus id ornare. Rhoncus in egestas in amet porttitor pellentesque sit. Amet gravida integer velit felis. Eu consectetur interdum auctor sed aliquam. Eu pulvinar accumsan sed id. Duis a aliquam eu quisque commodo lectus. Lectus ipsum velit purus viverra vulputate viverra in nunc nulla. Euismod rhoncus mauris urna orci gravida sagittis netus. Amet mus in vel etiam. Interdum habitant congue massa in etiam sit. Commodo nibh viverra lobortis augue lorem quam lorem suspendisse.";

  details: InfoCardDetail[] = [
    { label: 'Lorem Ipsum Dolor', value: '10/19/2017' },
    { label: 'Lorem Ipsum Dolor', value: 'Ut' },
    { label: 'Lorem Ipsum Dolor', value: 'Eros', isFixedHight: true, customStyle: { color: 'var(--gray-soft700)'} },
    { label: 'Lorem Ipsum Dolor', value: { iconPath: this.checkIconPath, text: 'Yes' }, customStyle: { color: 'var(--gray-soft700)'} },
    { label: 'Lorem Ipsum Dolor', value: 'Sit', isFixedHight: true, customStyle: { color: 'var(--gray-soft700)'} },
    { label: 'Lorem Ipsum Dolor', value: 'Lorem Ipsum Dolor', isFixedHight: true, customStyle: { color: 'var(--gray-soft700)', height: '35px' } },
    { label: 'Lorem Ipsum Dolor', value: 'Lorem Ipsum Dolor', customStyle: { color: 'var(--gray-soft700)'} }
  ];

  remediationSectionTitle: string = "Lorem Ipsum Dolor Sit";
  remediations: RemediationEntry[] = [
    {
      title: "Lorem P",
      items: [{
        iconPath: this.serverIconBlueBgPath,
        iconBgColor: 'var(--blue-100)',
        primaryLabel: "Server",
        secondaryLabel: "Server",
        description: "Lorem Ipsum Dolor Sit Amet Consectetur.",
        dividerImagePath: this.remediationDividerLinePath
      }]
    },
    {
      title: "Lorem S",
      items: [{
        iconPath: this.serverIconBlueBgPath,
        iconBgColor: 'var(--blue-100)',
        primaryLabel: "Server",
        secondaryLabel: "Server",
        description: "Lorem Ipsum Dolor Sit Amet Consectetur.",
        dividerImagePath: this.remediationDividerLinePath
      }]
    },
    {
      title: "Lorem T",
      items: [{
        iconPath: this.serverIconBlueBgPath,
        iconBgColor: 'var(--blue-100)',
        primaryLabel: "Server",
        secondaryLabel: "Server",
        description: "Lorem Ipsum Dolor Sit Amet Consectetur.",
        dividerImagePath: this.remediationDividerLinePath
      }]
    },
    // ... other remediation entries
  ];

  constructor() { }

  // Type guard for InfoCardDetailValue being an object with iconPath and text
  isDetailValueObject(value: InfoCardDetailValue): value is { iconPath?: string; text: string } {
    return typeof value === 'object' && value !== null && 'text' in value;
  }

  // Renamed from isString to avoid conflict if there was a global one, and to be more specific.
  isDetailValueString(value: InfoCardDetailValue): value is string {
    return typeof value === 'string';
  }

  // TrackBy functions made public
  public trackByLabel(index: number, item: InfoCardDetail): string {
    return item.label;
  }
  public trackByTitle(index: number, item: RemediationEntry): string {
    return item.title;
  }
}