import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ModalComponent } from './modal.component';
import { ModalService } from '../../../../core/services/modal.service';
import { ModalData } from '../../../../core/types/dashboard.types';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';

class MockModalService {
  private display = new BehaviorSubject<boolean>(false);
  private data = new BehaviorSubject<ModalData | null>(null);

  watch() { return this.display.asObservable(); }
  watchData() { return this.data.asObservable(); }
  open(data: ModalData) {
    this.data.next(data);
    this.display.next(true);
  }
  close() {
    this.display.next(false);
    this.data.next(null);
  }
  setDisplay(visible: boolean) { this.display.next(visible); }
  setData(modalData: ModalData | null) { this.data.next(modalData); }
}

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let modalService: MockModalService;
  let renderer: Renderer2;

  const mockModalData: ModalData = {
    title: 'Test Modal Title',
    contentHtml: '<p>Test Content</p>'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [CommonModule],
      providers: [
        { provide: ModalService, useClass: MockModalService },
        Renderer2,
        ChangeDetectorRef
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(ModalService) as unknown as MockModalService;
    renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2);

    const modalContainerEl = document.createElement('div');
    modalContainerEl.tabIndex = -1;
    component.modalContainerRef = new ElementRef(modalContainerEl);

    const closeButtonEl = document.createElement('button');
    component.closeButtonRef = new ElementRef(closeButtonEl);

    spyOn(renderer, 'addClass').and.callThrough();
    spyOn(renderer, 'removeClass').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display modal initially', () => {
    const modalOverlay = fixture.debugElement.query(By.css('.modal-overlay'));
    expect(modalOverlay).toBeNull();
  });

  describe('When modal is opened', () => {
    beforeEach(fakeAsync(() => {
      modalService.open(mockModalData);
      fixture.detectChanges();
      tick();
      if (component.closeButtonRef?.nativeElement) {
        spyOn(component.closeButtonRef.nativeElement, 'focus').and.callThrough();
      }
      if (component.modalContainerRef?.nativeElement) {
        spyOn(component.modalContainerRef.nativeElement, 'focus').and.callThrough();
      }
    }));

    it('should display modal when display$ is true', () => {
      const modalOverlay = fixture.debugElement.query(By.css('.modal-overlay'));
      expect(modalOverlay).toBeTruthy();
    });

    it('should display modal title and content', () => {
      const modalTitleEl = fixture.debugElement.query(By.css('.modal-title'));
      const modalContentEl = fixture.debugElement.query(By.css('.modal-content-area'));

      expect(modalTitleEl.nativeElement.textContent).toBe(mockModalData.title);
      expect(modalContentEl.nativeElement.innerHTML).toContain(mockModalData.contentHtml);
    });

    it('should add "modal-active" class to body', () => {
      expect(renderer.addClass).toHaveBeenCalledWith(document.body, 'modal-active');
    });

    it('should call modalService.close when close button is clicked', () => {
      spyOn(modalService, 'close').and.callThrough();
      const closeButton = fixture.debugElement.query(By.css('.modal-close-btn'));
      closeButton.triggerEventHandler('click', null);
      expect(modalService.close).toHaveBeenCalled();
    });

    it('should call modalService.close when overlay is clicked', () => {
      spyOn(modalService, 'close').and.callThrough();
      const modalOverlay = fixture.debugElement.query(By.css('.modal-overlay'));
      modalOverlay.triggerEventHandler('click', new MouseEvent('click'));
      expect(modalService.close).toHaveBeenCalled();
    });

    it('should not close modal if content area is clicked (event propagation stop)', () => {
      spyOn(modalService, 'close').and.callThrough();
      const modalContainer = fixture.debugElement.query(By.css('.modal-container'));
      const mockEvent = new MouseEvent('click');
      spyOn(mockEvent, 'stopPropagation');
      modalContainer.triggerEventHandler('click', mockEvent);
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(modalService.close).not.toHaveBeenCalled();
    });

    it('should call modalService.close on Escape keydown', () => {
      spyOn(modalService, 'close').and.callThrough();
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);
      fixture.detectChanges();
      expect(modalService.close).toHaveBeenCalled();
    });
  });


  describe('When modal is closed', () => {
    let previouslyFocusedElementMock: HTMLElement;
    beforeEach(fakeAsync(() => {
      previouslyFocusedElementMock = document.createElement('button');
      document.body.appendChild(previouslyFocusedElementMock);
      previouslyFocusedElementMock.focus();
      spyOn(previouslyFocusedElementMock, 'focus').and.callThrough();

      component['previouslyFocusedElement'] = previouslyFocusedElementMock;

      modalService.open(mockModalData);
      fixture.detectChanges();
      tick();

      modalService.close();
      fixture.detectChanges();
      tick();
    }));

    afterEach(() => {
        if (document.body.contains(previouslyFocusedElementMock)) {
            document.body.removeChild(previouslyFocusedElementMock);
        }
    });

    it('should hide modal when display$ is false', () => {
      const modalOverlay = fixture.debugElement.query(By.css('.modal-overlay'));
      expect(modalOverlay).toBeNull();
    });

    it('should remove "modal-active" class from body', () => {
      expect(renderer.removeClass).toHaveBeenCalledWith(document.body, 'modal-active');
    });
  });


  it('generateModalTitleId should create a valid ID', () => {
    expect(component.generateModalTitleId('Test Title 123!')).toBe('modalTitle-Test-Title-123');
    expect(component.generateModalTitleId(null)).toBeNull();
    expect(component.generateModalTitleId('')).toBeNull();
  });

  it('ngOnDestroy should unsubscribe and remove body class', () => {
    const sub = component['displaySubscription'];
    if (sub) spyOn(sub, 'unsubscribe');

    modalService.open(mockModalData);
    fixture.detectChanges();

    component.ngOnDestroy();

    if (sub) expect(sub.unsubscribe).toHaveBeenCalled();
    expect(renderer.removeClass).toHaveBeenCalledWith(document.body, 'modal-active');
  });

  describe('Focus Trapping (onOverlayKeydown)', () => {
    let mockEvent: KeyboardEvent;

    beforeEach(fakeAsync(() => {
        modalService.open(mockModalData);
        fixture.detectChanges();
        tick();

        const btn1 = document.createElement('button');
        const btn2 = document.createElement('a');
        btn2.setAttribute('href', '#');
        component.modalContainerRef.nativeElement.innerHTML = '';
        component.modalContainerRef.nativeElement.appendChild(btn1);
        component.modalContainerRef.nativeElement.appendChild(btn2);
        Object.defineProperty(document, 'activeElement', { writable: true, configurable: true });
    }));

     afterEach(() => {
        Object.defineProperty(document, 'activeElement', { value: document.body, writable: false, configurable: true });
    });


    it('should not trap focus if modal is not open', () => {
        component['isModalOpen'] = false;
        mockEvent = new KeyboardEvent('keydown', { key: 'Tab' });
        spyOn(mockEvent, 'preventDefault');
        component.onOverlayKeydown(mockEvent);
        expect(mockEvent.preventDefault).not.toHaveBeenCalled();
    });

    it('should prevent default if no focusable elements and Tab is pressed', () => {
        component.modalContainerRef.nativeElement.innerHTML = '';
        mockEvent = new KeyboardEvent('keydown', { key: 'Tab' });
        spyOn(mockEvent, 'preventDefault');
        component.onOverlayKeydown(mockEvent);
        expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('should focus last element if Tab + Shift on first element', () => {
        const focusable = Array.from(component.modalContainerRef.nativeElement.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )) as HTMLElement[];
        if (focusable.length < 2) {
            pending("Need at least two focusable elements for this test");
            return;
        }
        (document.activeElement as any) = focusable[0];
        const lastElement = focusable[focusable.length - 1] as HTMLElement;
        spyOn(lastElement, 'focus');

        mockEvent = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true });
        spyOn(mockEvent, 'preventDefault');

        component.onOverlayKeydown(mockEvent);

        expect(lastElement.focus).toHaveBeenCalled();
        expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('should focus first element if Tab on last element', () => {
        const focusable = Array.from(component.modalContainerRef.nativeElement.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )) as HTMLElement[];
         if (focusable.length < 2) {
            pending("Need at least two focusable elements for this test");
            return;
        }
        (document.activeElement as any) = focusable[focusable.length - 1];
        const firstElement = focusable[0] as HTMLElement;
        spyOn(firstElement, 'focus');

        mockEvent = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: false });
        spyOn(mockEvent, 'preventDefault');

        component.onOverlayKeydown(mockEvent);

        expect(firstElement.focus).toHaveBeenCalled();
        expect(mockEvent.preventDefault).toHaveBeenCalled();
    });
  });
});
