import { Component } from '@angular/core';
import { ToastService, Toast } from '../../services/toast.service';
import { fadeInOut, slideInRight } from '../../animations';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.css'],
  animations: [fadeInOut, slideInRight]
})
export class ToastContainerComponent {
  constructor(public toastService: ToastService) {}

  getToastIcon(type: Toast['type']): string {
    switch (type) {
      case 'success': return 'fas fa-check-circle';
      case 'error': return 'fas fa-exclamation-triangle';
      case 'warning': return 'fas fa-exclamation-circle';
      case 'info': return 'fas fa-info-circle';
      default: return 'fas fa-info-circle';
    }
  }

  getToastClasses(type: Toast['type']): string {
    const baseClasses = 'toast toast-container-item';
    switch (type) {
      case 'success': return `${baseClasses} toast-success`;
      case 'error': return `${baseClasses} toast-error`;
      case 'warning': return `${baseClasses} toast-warning`;
      case 'info': return `${baseClasses} toast-info`;
      default: return `${baseClasses} toast-info`;
    }
  }

  removeToast(toast: Toast): void {
    this.toastService.removeToast(toast.id);
  }
}
