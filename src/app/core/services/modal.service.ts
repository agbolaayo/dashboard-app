import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModalData } from '../types/dashboard.types';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private display: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private data: BehaviorSubject<ModalData | null> = new BehaviorSubject<ModalData | null>(null);

  watch(): Observable<boolean> {
    return this.display.asObservable();
  }

  watchData(): Observable<ModalData | null> {
    return this.data.asObservable();
  }

  open(data: ModalData): void {
    this.data.next(data);
    this.display.next(true);
  }

  close(): void {
    this.display.next(false);
    this.data.next(null);
  }
}