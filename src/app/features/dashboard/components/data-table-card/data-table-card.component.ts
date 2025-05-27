import { Component, HostListener } from '@angular/core';
import { TableRow, TableHeader, ModalData } from '../../../../core/types/dashboard.types';
import { ImagePaths } from '../../../../core/constants/dashboard.constants';
import { ModalService } from '../../../../core/services/modal.service';

@Component({
  selector: 'app-data-table-card',
  templateUrl: './data-table-card.component.html',
  standalone: false
})
export class DataTableCardComponent {
  assetIconPath: string = ImagePaths.ASSET_TABLE_ICON;

  headers: TableHeader[] = [
    { key: 'asset', label: 'Asset' },
    { key: 'contextualRisk', label: 'Contextual Risk', customStyle: { marginRight: '-3px' } }
  ];

  rows: TableRow[] = [
    {
      id: 1,
      asset: {
        iconPath: this.assetIconPath,
        iconBgColor: 'var(--blue-50)',
        primaryText: 'Loremipsumdolorsit',
        secondaryText: '192.168.1.1'
      },
      risk: {
        statusText: 'Critical',
        statusBgColor: 'var(--red-100)',
        statusTextColor: 'var(--red-800)'
      }
    },
    {
      id: 2,
      asset: {
        iconPath: this.assetIconPath,
        iconBgColor: 'var(--blue-50)',
        primaryText: 'Loremipsumdolorsit002',
        secondaryText: '192.168.1.2'
      },
      risk: {
        statusText: 'Medium',
        statusBgColor: 'var(--yellow-100)',
        statusTextColor: 'var(--yellow-600)'
      }
    },
    {
      id: 3,
      asset: {
        iconPath: this.assetIconPath,
        iconBgColor: 'var(--blue-50)',
        primaryText: 'Loremipsumdolorsit003',
        secondaryText: '192.168.1.3'
      },
      risk: {
        statusText: 'Low',
        statusBgColor: 'var(--green-50)',
        statusTextColor: 'var(--green-600)'
      }
    },
    {
      id: 4,
      asset: {
        iconPath: this.assetIconPath,
        iconBgColor: 'var(--blue-50)',
        primaryText: 'Loremipsumdolorsit004',
        secondaryText: '192.168.1.4'
      },
      risk: {
        statusText: 'Medium',
        statusBgColor: 'var(--yellow-100)',
        statusTextColor: 'var(--yellow-600)'
      }
    },
    {
      id: 5,
      asset: {
        iconPath: this.assetIconPath,
        iconBgColor: 'var(--blue-50)',
        primaryText: 'Loremipsumdolorsit005',
        secondaryText: '192.168.1.5'
      },
      risk: {
        statusText: 'Critical',
        statusBgColor: 'var(--red-100)',
        statusTextColor: 'var(--red-800)'
      }
    },
    {
      id: 6,
      asset: {
        iconPath: this.assetIconPath,
        iconBgColor: 'var(--blue-50)',
        primaryText: 'Loremipsumdolorsit006',
        secondaryText: '192.168.1.6'
      },
      risk: {
        statusText: 'Low',
        statusBgColor: 'var(--green-50)',
        statusTextColor: 'var(--green-600)'
      }
    },
    {
      id: 7,
      asset: {
        iconPath: this.assetIconPath,
        iconBgColor: 'var(--blue-50)',
        primaryText: 'Loremipsumdolorsit007',
        secondaryText: '192.168.1.7'
      },
      risk: {
        statusText: 'Low',
        statusBgColor: 'var(--green-50)',
        statusTextColor: 'var(--green-600)'
      }
    },
    {
      id: 8,
      asset: {
        iconPath: this.assetIconPath,
        iconBgColor: 'var(--blue-50)',
        primaryText: 'Loremipsumdolorsit008',
        secondaryText: '192.168.1.8'
      },
      risk: {
        statusText: 'Medium',
        statusBgColor: 'var(--yellow-100)',
        statusTextColor: 'var(--yellow-600)'
      }
    }
  ];

  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalItems: number = 0;

  private tableRowModalHtml: string = `
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
</div>`;

  constructor(private modalService: ModalService) {
    this.totalItems = this.rows.length;
  }

  get pagedRows(): TableRow[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.rows.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get paginationText(): string {
    if (this.totalItems === 0) return "No items";
    const startItem = Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.totalItems);
    const endItem = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
    return `Showing ${startItem}-${endItem} of ${this.totalItems}`;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.totalItems) {
      this.currentPage++;
    }
  }

  openModal(row: TableRow): void {
    const modalData: ModalData = {
      title: `${row.asset.primaryText} Details`,
      contentHtml: this.tableRowModalHtml
    };
    this.modalService.open(modalData);
  }

  public trackById(index: number, item: TableRow | TableHeader): string | number {
    if ((item as TableRow).id !== undefined) {
        return (item as TableRow).id;
    } else if ((item as TableHeader).key) {
        return (item as TableHeader).key;
    }
    return index;
  }

  onTableKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.previousPage();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.nextPage();
    }
  }

  onPaginationControlKeydown(event: Event, action: 'next' | 'prev'): void {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
      keyboardEvent.preventDefault();
      if (action === 'next') {
        this.nextPage();
      } else {
        this.previousPage();
      }
    }
  }
}