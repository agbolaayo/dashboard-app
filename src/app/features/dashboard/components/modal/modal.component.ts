import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from '../../../../core/services/modal.service';
import { ModalData } from '../../../../core/types/dashboard.types';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  standalone: false,
})
export class ModalComponent implements OnInit {
  display$: Observable<boolean>;
  data$: Observable<ModalData | null>;

  constructor(private modalService: ModalService) {
    this.display$ = this.modalService.watch();
    this.data$ = this.modalService.watchData();
  }

  ngOnInit(): void {}

  close(): void {
    this.modalService.close();
  }
}