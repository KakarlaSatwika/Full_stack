import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private loadingMap: Map<string, boolean> = new Map();

  get isLoading$(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  get isLoading(): boolean {
    return this.loadingSubject.value;
  }

  setLoading(loading: boolean, url?: string): void {
    if (url) {
      if (loading) {
        this.loadingMap.set(url, loading);
      } else {
        this.loadingMap.delete(url);
      }
      this.loadingSubject.next(this.loadingMap.size > 0);
    } else {
      this.loadingSubject.next(loading);
    }
  }

  startLoading(url?: string): void {
    this.setLoading(true, url);
  }

  stopLoading(url?: string): void {
    this.setLoading(false, url);
  }
}
