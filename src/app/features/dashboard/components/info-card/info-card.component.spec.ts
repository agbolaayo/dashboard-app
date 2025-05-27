import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InfoCardComponent } from './info-card.component';
import { RemediationEntryCardComponent } from '../remediation-entry-card/remediation-entry-card.component';
import { ImagePaths, DashboardUIText } from '../../../../core/constants/dashboard.constants';
import { InfoCardDetail, RemediationEntry, InfoCardDetailValue } from '../../../../core/types/dashboard.types';
import { CommonModule } from '@angular/common';

describe('InfoCardComponent', () => {
  let component: InfoCardComponent;
  let fixture: ComponentFixture<InfoCardComponent>;

  const mockDetails: InfoCardDetail[] = [
    { label: 'Test Label 1', value: 'Test Value 1' },
    { label: 'Test Label 2', value: { iconPath: ImagePaths.CHECK_ICON, text: 'Yes' } },
    { label: 'Test Label 3', value: 'Fixed Height Value', isFixedHight: true },
  ];

  const mockRemediations: RemediationEntry[] = [
    {
      title: "Remediation P",
      items: [{
        iconPath: ImagePaths.SERVER_ICON_BLUE_BG,
        primaryLabel: "Server P",
        secondaryLabel: "Status P",
        description: "Desc P",
      }],
      additionalDetails: "Details P"
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoCardComponent, RemediationEntryCardComponent],
      imports: [CommonModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCardComponent);
    component = fixture.componentInstance;

    component.details = [...mockDetails];
    component.remediations = [...mockRemediations];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display description title and text', () => {
    component.descriptionTitle = 'Custom Desc Title';
    component.descriptionText = 'Custom description text here.';
    fixture.detectChanges();

    const titleEl = fixture.debugElement.query(By.css('.card-title'));
    const textEl = fixture.debugElement.query(By.css('.card-body-text'));

    expect(titleEl.nativeElement.textContent).toContain('Custom Desc Title');
    expect(textEl.nativeElement.textContent).toContain('Custom description text here.');
  });

  it('should display extra title and text', () => {
    component.extraTitle = 'Custom Extra Title';
    component.extraText = 'Custom extra text here.';
    fixture.detectChanges();

    const titleEl = fixture.debugElement.query(By.css('.card-subtitle'));
    const textEls = fixture.debugElement.queryAll(By.css('.card-body-text'));

    expect(titleEl.nativeElement.textContent).toContain('Custom Extra Title');
    expect(textEls[1].nativeElement.textContent).toContain('Custom extra text here.');
  });

  it('should render all info details', () => {
    const detailRowElements = fixture.debugElement.queryAll(By.css('.detail-row'));
    expect(detailRowElements.length).toBe(mockDetails.length);
  });

  it('should render string detail value correctly', () => {
    const firstDetailRow = fixture.debugElement.queryAll(By.css('.detail-row'))[0];
    const labelEl = firstDetailRow.query(By.css('.detail-label'));
    const valueEl = firstDetailRow.query(By.css('.detail-value'));

    expect(labelEl.nativeElement.textContent).toContain('Test Label 1');
    expect(valueEl.nativeElement.textContent).toContain('Test Value 1');
  });

  it('should render object detail value with icon correctly', () => {
    const secondDetailRow = fixture.debugElement.queryAll(By.css('.detail-row'))[1];
    const labelEl = secondDetailRow.query(By.css('.detail-label'));
    const valueEl = secondDetailRow.query(By.css('.detail-value'));
    const iconEl = secondDetailRow.query(By.css('.check-icon'));

    expect(labelEl.nativeElement.textContent).toContain('Test Label 2');
    expect(valueEl.nativeElement.textContent).toContain('Yes');
    expect(iconEl.nativeElement.src).toContain(ImagePaths.CHECK_ICON);
  });

  it('should apply fixed-height class when isFixedHight is true', () => {
    const thirdDetailRow = fixture.debugElement.queryAll(By.css('.detail-row'))[2];
    expect(thirdDetailRow.classes['fixed-height']).toBeTrue();
  });

  it('should display remediation section title', () => {
    component.remediationSectionTitle = 'Custom Remediation Title';
    fixture.detectChanges();
    const titleEl = fixture.debugElement.query(By.css('.section-sub-heading'));
    expect(titleEl.nativeElement.textContent).toContain('Custom Remediation Title');
  });

  it('should render all remediation entries using app-remediation-entry-card', () => {
    const remediationEntryElements = fixture.debugElement.queryAll(By.directive(RemediationEntryCardComponent));
    expect(remediationEntryElements.length).toBe(mockRemediations.length);
    expect(remediationEntryElements[0].componentInstance.remediation).toEqual(mockRemediations[0]);
  });

  describe('Type Guards', () => {
    it('isDetailValueObject should return true for object value', () => {
      const objValue: InfoCardDetailValue = { text: 'Test' };
      expect(component.isDetailValueObject(objValue)).toBeTrue();
    });

    it('isDetailValueObject should return false for string value', () => {
      const strValue: InfoCardDetailValue = 'Test';
      expect(component.isDetailValueObject(strValue)).toBeFalse();
    });

    it('isDetailValueString should return true for string value', () => {
      const strValue: InfoCardDetailValue = 'Test';
      expect(component.isDetailValueString(strValue)).toBeTrue();
    });

    it('isDetailValueString should return false for object value', () => {
      const objValue: InfoCardDetailValue = { text: 'Test' };
      expect(component.isDetailValueString(objValue)).toBeFalse();
    });
  });

  it('trackByLabel should return item.label', () => {
    expect(component.trackByLabel(0, mockDetails[0])).toBe(mockDetails[0].label);
  });

  it('trackByTitle should return item.title', () => {
    expect(component.trackByTitle(0, mockRemediations[0])).toBe(mockRemediations[0].title);
  });
});
