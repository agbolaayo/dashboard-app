import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SummaryChartCardComponent } from './summary-chart-card.component';
import { ChartLegendItem } from '../../../../core/types/dashboard.types';
import { ChartColors, DashboardUIText } from '../../../../core/constants/dashboard.constants';
import { ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as ChartJS from 'chart.js';

describe('SummaryChartCardComponent', () => {
  let component: SummaryChartCardComponent;
  let fixture: ComponentFixture<SummaryChartCardComponent>;

  const mockLegendItems: ChartLegendItem[] = [
    { id: 'c', label: 'Critical', count: 5, colorClass: 'critical', colorValue: ChartColors.CRITICAL, visible: true },
    { id: 'h', label: 'High', count: 10, colorClass: 'high', colorValue: ChartColors.HIGH, visible: true },
    { id: 'm', label: 'Medium', count: 0, colorClass: 'medium', colorValue: ChartColors.MEDIUM, visible: false },
  ];

  beforeAll(() => {
    ChartJS.Chart.register(...ChartJS.registerables);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SummaryChartCardComponent],
      imports: [CommonModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryChartCardComponent);
    component = fixture.componentInstance;
    component.legendItems = JSON.parse(JSON.stringify(mockLegendItems));

    const canvasEl = document.createElement('canvas');
    component.chartCanvas = new ElementRef<HTMLCanvasElement>(canvasEl);
    
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the chart title', () => {
    const titleEl = fixture.debugElement.query(By.css('.chart-card-title'));
    expect(titleEl.nativeElement.textContent).toContain(DashboardUIText.SUMMARY_CHART_TITLE);
  });

  it('should render legend items', () => {
    const legendItemElements = fixture.debugElement.queryAll(By.css('.legend-item-row'));
    expect(legendItemElements.length).toBe(mockLegendItems.length);
    expect(legendItemElements[0].nativeElement.textContent).toContain('Critical');
    expect(legendItemElements[0].nativeElement.textContent).toContain('5');
  });

  it('should initialize and create chart on ngAfterViewInit', fakeAsync(() => {
    tick(); 
    expect(component['chartInstance']).toBeTruthy();
    if (component['chartInstance']) {
        const chartInstance = component['chartInstance'] as ChartJS.Chart;
        // Expectation changed: Chart is initialized with ALL legend items' data,
        // visibility is handled by Chart.js or subsequent updates.
        expect(chartInstance.data.labels).toEqual(component.legendItems.map(item => item.label));
        expect(chartInstance.data.datasets[0].data).toEqual(component.legendItems.map(item => item.count));
    }
  }));


  it('should update doughnutCenterValue on init', () => {
    expect(component.doughnutCenterValue).toBe(15);
  });

  it('should update doughnutCenterValue when a legend item visibility changes', () => {
    component.toggleLegendItem(component.legendItems[0]); 
    fixture.detectChanges();
    expect(component.doughnutCenterValue).toBe(10); 

    component.toggleLegendItem(component.legendItems[2]); 
    fixture.detectChanges();
    expect(component.doughnutCenterValue).toBe(10); 

    component.toggleLegendItem(component.legendItems[0]); 
    fixture.detectChanges();
    expect(component.doughnutCenterValue).toBe(15); 
  });

  it('toggleLegendItem should update item visibility and chart data', () => {
    const itemToToggle = component.legendItems[0];
    const initialVisibility = itemToToggle.visible;
    
    const chartInstance = component['chartInstance'] as ChartJS.Chart;
    spyOn(chartInstance, 'update').and.callThrough();

    component.toggleLegendItem(itemToToggle);
    fixture.detectChanges();

    expect(itemToToggle.visible).toBe(!initialVisibility);
    expect(chartInstance.update).toHaveBeenCalled();

    const expectedChartData = component.legendItems.map(li => li.visible ? li.count : 0);
    expect(chartInstance.data.datasets[0].data).toEqual(expectedChartData);
  });

   it('should call toggleLegendItem on legend item click', () => {
    spyOn(component, 'toggleLegendItem').and.callThrough();
    const firstLegendEntry = fixture.debugElement.query(By.css('.legend-entry'));
    firstLegendEntry.triggerEventHandler('click', null);
    expect(component.toggleLegendItem).toHaveBeenCalledWith(component.legendItems[0]);
  });

  it('should destroy chart on ngOnDestroy', () => {
    const chartInstance = component['chartInstance'] as ChartJS.Chart;
    spyOn(chartInstance, 'destroy').and.callThrough();
    
    component.ngOnDestroy();
    
    expect(chartInstance.destroy).toHaveBeenCalled();
    expect(component['chartInstance']).toBeNull();
  });

  it('trackById should return item.id', () => {
    expect(component.trackById(0, mockLegendItems[0])).toBe(mockLegendItems[0].id);
  });

  it('createChart should handle no canvas context gracefully', fakeAsync(() => {
    spyOn(console, 'error');
    const tempCanvasEl = document.createElement('canvas'); 
    component.chartCanvas = new ElementRef<HTMLCanvasElement>(tempCanvasEl);

    const originalGetContext = tempCanvasEl.getContext;
    spyOn(tempCanvasEl, 'getContext').and.returnValue(null);

    if(component['chartInstance']) {
        (component['chartInstance'] as ChartJS.Chart).destroy(); 
        component['chartInstance'] = null;
    }
    
    component['createChart'](); 
    tick();

    expect(console.error).toHaveBeenCalledWith('Failed to get chart context');
    
    tempCanvasEl.getContext = originalGetContext; 
  }));


   it('createChart should handle no chartCanvas gracefully', fakeAsync(() => {
    spyOn(console, 'error');
    if(component['chartInstance']) {
        (component['chartInstance'] as ChartJS.Chart).destroy();
        component['chartInstance'] = null;
    }
    (component as any).chartCanvas = null;
    
    component['createChart'](); 
    tick();
    
    expect(console.error).toHaveBeenCalledWith('Chart canvas not available');
  }));
});
