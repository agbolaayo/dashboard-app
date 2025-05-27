import { Component, Input } from '@angular/core';
import { RemediationEntry, RemediationItemDetail } from '../../../../core/types/dashboard.types';

@Component({
  selector: 'app-remediation-entry-card',
  templateUrl: './remediation-entry-card.component.html',
  standalone: false
})
export class RemediationEntryCardComponent {
  @Input() remediation!: RemediationEntry;
  public detailsVisible: boolean = false;

  constructor() { }

  toggleDetails(): void {
    this.detailsVisible = !this.detailsVisible;
  }

  trackByIndex(index: number, item: RemediationItemDetail): number {
    return index;
  }
}
