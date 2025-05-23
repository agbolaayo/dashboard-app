import { Component } from '@angular/core';
import { TableRow, TableHeader } from '../../../../core/types/dashboard.types';
import { ImagePaths } from '../../../../core/constants/dashboard.constants';

@Component({
  selector: 'app-data-table-card',
  templateUrl: './data-table-card.component.html',
  standalone: false
})
export class DataTableCardComponent {
  assetIconPath: string = ImagePaths.ASSET_TABLE_ICON;
  chevronLeftPath: string = ImagePaths.PAGINATION_CHEVRON_LEFT;
  chevronRightPath: string = ImagePaths.PAGINATION_CHEVRON_RIGHT;

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
        statusText: 'Critical',
        statusBgColor: 'var(--red-100)',
        statusTextColor: 'var(--red-800)'
      }
    },
    {
      id: 3,
      asset: {
        iconPath: this.assetIconPath,
        iconBgColor: 'var(--blue-50)',
        primaryText: 'Loremipsumdolorsit002',
        secondaryText: '192.168.1.2'
      },
      risk: {
        statusText: 'Critical',
        statusBgColor: 'var(--red-100)',
        statusTextColor: 'var(--red-800)'
      }
    },
    {
      id: 4,
      asset: {
        iconPath: this.assetIconPath,
        iconBgColor: 'var(--blue-50)',
        primaryText: 'Loremipsumdolorsit002',
        secondaryText: '192.168.1.2'
      },
      risk: {
        statusText: 'Critical',
        statusBgColor: 'var(--red-100)',
        statusTextColor: 'var(--red-800)'
      }
    },
  ];

  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalItems: number = 0;

  constructor() {
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

  public trackById(index: number, item: TableRow | TableHeader): string | number {
    if ((item as TableRow).id !== undefined) { 
        return (item as TableRow).id;
    } else if ((item as TableHeader).key) {
        return (item as TableHeader).key;
    }
    return index;
  }
}