import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild, AfterViewChecked, Renderer2, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ModalService } from '../../../../core/services/modal.service';
import { ModalData } from '../../../../core/types/dashboard.types';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  standalone: false,
})
export class ModalComponent implements OnInit, OnDestroy, AfterViewChecked {
  display$: Observable<boolean>;
  data$: Observable<ModalData | null>;

  @ViewChild('modalContainer') modalContainerRef!: ElementRef<HTMLElement>;
  @ViewChild('closeButton') closeButtonRef!: ElementRef<HTMLButtonElement>;

  private displaySubscription: Subscription | undefined;
  private previouslyFocusedElement: HTMLElement | null = null;
  private isModalOpen = false;


  constructor(
    private modalService: ModalService,
    private renderer: Renderer2,
    private cdRef: ChangeDetectorRef
    ) {
    this.display$ = this.modalService.watch();
    this.data$ = this.modalService.watchData();
  }

  ngOnInit(): void {
    this.displaySubscription = this.display$.subscribe(isOpen => {
      this.isModalOpen = isOpen;
      if (isOpen) {
        this.previouslyFocusedElement = document.activeElement as HTMLElement;
        this.cdRef.detectChanges();
        this.focusFirstElement();
        this.renderer.addClass(document.body, 'modal-active');
      } else {
        this.restoreFocus();
        this.renderer.removeClass(document.body, 'modal-active');
      }
    });
  }

  ngAfterViewChecked(): void {
  }

  private focusFirstElement(): void {
    setTimeout(() => {
      if (this.closeButtonRef?.nativeElement) {
        this.closeButtonRef.nativeElement.focus();
      } else if (this.modalContainerRef?.nativeElement) {
        this.modalContainerRef.nativeElement.focus();
      }
    }, 0);
  }

  private restoreFocus(): void {
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
      this.previouslyFocusedElement = null;
    }
  }

  close(): void {
    this.modalService.close();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.isModalOpen) {
      this.close();
    }
  }

  onOverlayKeydown(event: KeyboardEvent): void {
    if (!this.isModalOpen || event.key !== 'Tab' || !this.modalContainerRef?.nativeElement) {
      return;
    }

    const focusableElements = this.modalContainerRef.nativeElement.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    if (focusableElements.length === 0) {
        event.preventDefault();
        return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  }

  generateModalTitleId(title: string | undefined | null): string | null {
    if (!title) {
      return null;
    }
    return 'modalTitle-' + title.replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  }


  ngOnDestroy(): void {
    if (this.displaySubscription) {
      this.displaySubscription.unsubscribe();
    }
    this.renderer.removeClass(document.body, 'modal-active');
  }
}