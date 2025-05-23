import { Component, Input } from '@angular/core';
import { RemediationEntry } from '../../../../core/types/dashboard.types'; //

@Component({
  selector: 'app-remediation-entry-card',
  templateUrl: './remediation-entry-card.component.html',
  // styleUrls: ['./remediation-entry-card.component.scss']
  standalone: false
})
export class RemediationEntryCardComponent {
  @Input() remediation!: RemediationEntry;
  public detailsVisible: boolean = false;

  constructor() { }

  toggleDetails(): void {
    console.log('toggleDetails() called for remediation title:', this.remediation?.title); 
    this.detailsVisible = !this.detailsVisible;
    // console.log('detailsVisible is now:', this.detailsVisible);
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}