import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DataTableCardComponent } from './data-table-card.component';
import { ModalService } from '../../../../core/services/modal.service';
import { ImagePaths } from '../../../../core/constants/dashboard.constants';
import { TableRow, TableHeader, ModalData } from '../../../../core/types/dashboard.types';
import { CommonModule } from '@angular/common';

class MockModalService {
  open(data: ModalData): void {}
  close(): void {}
}

describe('DataTableCardComponent', () => {
  let component: DataTableCardComponent;
  let fixture: ComponentFixture<DataTableCardComponent>;
  let modalService: ModalService;

  const mockRowsInitial: TableRow[] = [
    { id: 1, asset: { iconPath: ImagePaths.ASSET_TABLE_ICON, iconBgColor: 'blue', primaryText: 'Asset 1', secondaryText: '1.1.1.1' }, risk: { statusText: 'Critical', statusBgColor: 'red', statusTextColor: 'white' } },
    { id: 2, asset: { iconPath: ImagePaths.ASSET_TABLE_ICON, iconBgColor: 'green', primaryText: 'Asset 2', secondaryText: '2.2.2.2' }, risk: { statusText: 'Low', statusBgColor: 'lightgreen', statusTextColor: 'darkgreen' } },
    { id: 3, asset: { iconPath: ImagePaths.ASSET_TABLE_ICON, iconBgColor: 'yellow', primaryText: 'Asset 3', secondaryText: '3.3.3.3' }, risk: { statusText: 'Medium', statusBgColor: 'orange', statusTextColor: 'black' } },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataTableCardComponent],
      imports: [CommonModule],
      providers: [
        { provide: ModalService, useClass: MockModalService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTableCardComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(ModalService);

    component.rows = [...mockRowsInitial];
    component.itemsPerPage = 2;
    component.totalItems = component.rows.length;
    component.currentPage = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display table headers', () => {
    const headerElements = fixture.debugElement.queryAll(By.css('.table-header-label'));
    expect(headerElements.length).toBe(component.headers.length);
    expect(headerElements[0].nativeElement.textContent).toContain(component.headers[0].label);
    expect(headerElements[1].nativeElement.textContent).toContain(component.headers[1].label);
  });


  it('should display asset information in rows', () => {
    fixture.detectChanges();
    const firstRowAssetPrimaryText = fixture.debugElement.query(By.css('div.table-cell[role="button"] .asset-text-details .node-primary-text'));
    expect(firstRowAssetPrimaryText).toBeTruthy();
    expect(firstRowAssetPrimaryText.nativeElement.textContent).toContain(mockRowsInitial[0].asset.primaryText);
  });

  it('should display risk information in rows', () => {
    fixture.detectChanges();
    const firstRowRiskText = fixture.debugElement.query(By.css('div.table-cell[role="button"] .risk-status-text'));
    expect(firstRowRiskText).toBeTruthy();
    expect(firstRowRiskText.nativeElement.textContent).toContain(mockRowsInitial[0].risk.statusText);
  });

  describe('Pagination', () => {
    beforeEach(() => {
        component.rows = [...mockRowsInitial];
        component.itemsPerPage = 2;
        component.totalItems = component.rows.length;
        component.currentPage = 1;
        fixture.detectChanges();
    });

    it('should initialize on page 1', () => {
      expect(component.currentPage).toBe(1);
      const rowElements = fixture.debugElement.queryAll(By.css('div.table-cell[role="button"] .asset-text-details .node-primary-text'));
      expect(rowElements[0].nativeElement.textContent).toContain(mockRowsInitial[0].asset.primaryText);
      expect(rowElements[1].nativeElement.textContent).toContain(mockRowsInitial[1].asset.primaryText);
    });

    it('should navigate to the next page', () => {
      component.nextPage();
      fixture.detectChanges();
      expect(component.currentPage).toBe(2);
      const rowElements = fixture.debugElement.queryAll(By.css('div.table-cell[role="button"] .asset-text-details .node-primary-text'));
      expect(rowElements.length).toBe(1);
      expect(rowElements[0].nativeElement.textContent).toContain(mockRowsInitial[2].asset.primaryText);
    });

    it('nextPage button should be disabled on the last page', () => {
      component.currentPage = 1;
      fixture.detectChanges();
      component.nextPage();
      fixture.detectChanges();
      const nextButton = fixture.debugElement.query(By.css('.pagination-arrow.next-arrow'));
      expect(nextButton.classes['disabled']).toBeTrue();
    });

    it('should navigate to the previous page', () => {
      component.currentPage = 2;
      fixture.detectChanges();
      component.previousPage();
      fixture.detectChanges();
      expect(component.currentPage).toBe(1);
      const rowElements = fixture.debugElement.queryAll(By.css('div.table-cell[role="button"] .asset-text-details .node-primary-text'));
      expect(rowElements.length).toBe(2);
      expect(rowElements[0].nativeElement.textContent).toContain(mockRowsInitial[0].asset.primaryText);
    });

    it('previousPage button should be disabled on the first page', () => {
      component.currentPage = 1;
      fixture.detectChanges();
      const prevButton = fixture.debugElement.query(By.css('.pagination-arrow.prev-arrow'));
      expect(prevButton.classes['disabled']).toBeTrue();
    });

    it('should update paginationText correctly', () => {
      component.currentPage = 1;
      fixture.detectChanges();
      expect(component.paginationText).toBe(`Showing 1-${component.itemsPerPage} of ${component.totalItems}`);

      component.nextPage();
      fixture.detectChanges();
      expect(component.paginationText).toBe(`Showing 3-${component.totalItems} of ${component.totalItems}`);
    });

    it('should handle pagination with no items', () => {
      component.rows = [];
      component.totalItems = 0;
      component.currentPage = 1;
      fixture.detectChanges();
      expect(component.paginationText).toBe("No items");
      const arrowButtons = fixture.debugElement.queryAll(By.css('.pagination-arrow'));
      expect(arrowButtons.length).toBe(0);
    });

     it('should call nextPage on ArrowRight keydown on table', () => {
      spyOn(component, 'nextPage');
      const tableDiv = fixture.debugElement.query(By.css('.data-table-card'));
      tableDiv.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      expect(component.nextPage).toHaveBeenCalled();
    });

    it('should call previousPage on ArrowLeft keydown on table', () => {
      spyOn(component, 'previousPage');
      component.currentPage = 2;
      fixture.detectChanges();
      const tableDiv = fixture.debugElement.query(By.css('.data-table-card'));
      tableDiv.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      expect(component.previousPage).toHaveBeenCalled();
    });

    it('should call nextPage on Enter keydown on next pagination control', () => {
      spyOn(component, 'nextPage');
      const nextControl = fixture.debugElement.query(By.css('.pagination-arrow.next-arrow'));
      nextControl.triggerEventHandler('keydown.enter', new KeyboardEvent('keydown', { key: 'Enter' }));
      expect(component.nextPage).toHaveBeenCalled();
    });
  });

  describe('Modal Interaction', () => {
    beforeEach(() => {
        component.rows = [...mockRowsInitial];
        component.itemsPerPage = 2;
        component.totalItems = component.rows.length;
        component.currentPage = 1;
        fixture.detectChanges();
    });

    it('should call modalService.open when a row is clicked', () => {
      spyOn(modalService, 'open');
      const firstRowClickableElement = fixture.debugElement.query(By.css('div.table-cell[role="button"]'));
      expect(firstRowClickableElement).toBeTruthy('Expected to find a clickable row element');
      firstRowClickableElement.triggerEventHandler('click', null);

      const expectedModalData: ModalData = {
        title: `${mockRowsInitial[0].asset.primaryText} Details`,
        contentHtml: (component as any).tableRowModalHtml
      };
      expect(modalService.open).toHaveBeenCalledWith(expectedModalData);
    });

    it('should call modalService.open on Enter keydown on a row', () => {
      spyOn(modalService, 'open');
      const firstRowClickableElement = fixture.debugElement.query(By.css('div.table-cell[role="button"]'));
      expect(firstRowClickableElement).toBeTruthy('Expected to find a clickable row element for keydown event');
      firstRowClickableElement.triggerEventHandler('keydown.enter', new KeyboardEvent('keydown', {key: 'Enter'}));

      const expectedModalData: ModalData = {
        title: `${mockRowsInitial[0].asset.primaryText} Details`,
        contentHtml: (component as any).tableRowModalHtml
      };
      expect(modalService.open).toHaveBeenCalledWith(expectedModalData);
    });
  });

  it('trackById should return item.id for TableRow or item.key for TableHeader', () => {
    const tableRow: TableRow = { id: 'row123', asset: {} as any, risk: {} as any };
    const tableHeader: TableHeader = { key: 'headerKey', label: 'Header' };
    expect(component.trackById(0, tableRow)).toBe('row123');
    expect(component.trackById(0, tableHeader)).toBe('headerKey');
    expect(component.trackById(0, {} as any)).toBe(0);
  });
});
