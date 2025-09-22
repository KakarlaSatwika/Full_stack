import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  private nextId = 0;

  get toasts$(): Observable<Toast[]> {
    return this.toastsSubject.asObservable();
  }

  get toasts(): Toast[] {
    return this.toastsSubject.value;
  }

  showSuccess(title: string, message: string, duration: number = 5000): void {
    this.showToast('success', title, message, duration);
  }

  showError(title: string, message: string, duration: number = 7000): void {
    this.showToast('error', title, message, duration);
  }

  showWarning(title: string, message: string, duration: number = 6000): void {
    this.showToast('warning', title, message, duration);
  }

  showInfo(title: string, message: string, duration: number = 5000): void {
    this.showToast('info', title, message, duration);
  }

  private showToast(type: Toast['type'], title: string, message: string, duration: number): void {
    const toast: Toast = {
      id: `toast-${this.nextId++}`,
      type,
      title,
      message,
      duration
    };

    this.toastsSubject.next([...this.toasts, toast]);

    // Auto remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        this.removeToast(toast.id);
      }, duration);
    }
  }

  removeToast(id: string): void {
    const updatedToasts = this.toasts.filter(toast => toast.id !== id);
    this.toastsSubject.next(updatedToasts);
  }

  clearAll(): void {
    this.toastsSubject.next([]);
  }
}
