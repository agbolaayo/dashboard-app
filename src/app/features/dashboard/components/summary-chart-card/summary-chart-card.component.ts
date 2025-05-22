import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables, ChartType, ChartData, ChartOptions } from 'chart.js';
import { ChartLegendItem } from '../../../../core/types/dashboard.types';
import { ChartColors, DoughnutChartOptions } from '../../../../core/constants/dashboard.constants';

Chart.register(...registerables);

@Component({
  selector: 'app-summary-chart-card',
  templateUrl: './summary-chart-card.component.html',
  standalone: false
  // styleUrls: ['./summary-chart-card.component.scss']
})
export class SummaryChartCardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('contextualRiskChartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chartInstance: Chart | null = null;

  chartTitle: string = "Contextual Risk";
  doughnutCenterValue: number = 0;

  legendItems: ChartLegendItem[] = [
    { id: 'critical', label: 'Critical', count: 2, colorClass: 'critical', colorValue: ChartColors.CRITICAL, visible: true },
    { id: 'high', label: 'High', count: 4, colorClass: 'high', colorValue: ChartColors.HIGH, visible: true },
    { id: 'medium', label: 'Medium', count: 3, colorClass: 'medium', colorValue: ChartColors.MEDIUM, visible: true },
    { id: 'low', label: 'Low', count: 8, colorClass: 'low', colorValue: ChartColors.LOW, visible: true },
  ];

  constructor() { }

  ngOnInit(): void {
    this.updateTotalCenterValue();
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  private createChart(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
    if (!this.chartCanvas || !this.chartCanvas.nativeElement) {
        console.error("Chart canvas not available");
        return;
    }

    const context = this.chartCanvas.nativeElement.getContext('2d');
    if (!context) {
      console.error('Failed to get chart context');
      return;
    }

    const chartData: ChartData<'doughnut'> = {
      labels: this.legendItems.map(item => item.label),
      datasets: [{
        data: this.legendItems.map(item => item.count),
        backgroundColor: this.legendItems.map(item => item.colorValue),
        borderWidth: 0,
        hoverBorderWidth: 0
      }]
    };

    this.chartInstance = new Chart(context, {
      type: 'doughnut',
      data: chartData,
      options: DoughnutChartOptions as ChartOptions<'doughnut'> // Cast for stricter typing
    });
  }

  toggleLegendItem(item: ChartLegendItem): void {
    item.visible = !item.visible;
    if (this.chartInstance) {
      const itemIndex = this.legendItems.findIndex(legend => legend.id === item.id);
      if (itemIndex !== -1) {
        // Chart.js v3+ uses isDatasetVisible and toggleDataVisibility for more complex scenarios.
        // For simple doughnut segment hiding, we might need to filter data and update.
        // A simpler way for visual toggle is to set data to 0 if not visible, and re-render.
        // However, the original HTML script uses chart.toggleDataVisibility(index).
        // Let's try to mimic that behavior by manipulating the visibility array Chart.js uses internally.
        // This is a bit of a hack as direct segment visibility toggle isn't straightforward.
        // A more robust way is to update the chart's data array.

        // More robust approach: rebuild dataset
        const newData = this.legendItems.map(li => li.visible ? li.count : 0);
        this.chartInstance.data.datasets[0].data = newData;
        // To truly hide (not just set to 0), you might need to filter labels and data:
        // this.chartInstance.data.labels = this.legendItems.filter(i => i.visible).map(i => i.label);
        // this.chartInstance.data.datasets[0].data = this.legendItems.filter(i => i.visible).map(i => i.count);
        // this.chartInstance.data.datasets[0].backgroundColor = this.legendItems.filter(i => i.visible).map(i => i.colorValue);

        this.chartInstance.update();
      }
    }
    this.updateTotalCenterValue();
  }

  updateTotalCenterValue(): void {
    this.doughnutCenterValue = this.legendItems
      .filter(item => item.visible)
      .reduce((sum, item) => sum + item.count, 0);
  }

  trackById(index: number, item: ChartLegendItem): string {
    return item.id;
  }

  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
  }
}