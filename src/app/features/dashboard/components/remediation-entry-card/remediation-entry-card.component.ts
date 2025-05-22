import { Component, Input } from '@angular/core';
import { RemediationEntry } from '../../../../core/types/dashboard.types';

@Component({
  selector: 'app-remediation-entry-card',
  templateUrl: './remediation-entry-card.component.html',
  standalone: false
})
export class RemediationEntryCardComponent {
  @Input() remediation!: RemediationEntry;

  constructor() { }

  trackByIndex(index: number, item: any): number { // item type can be more specific if needed
    return index;
  }
}