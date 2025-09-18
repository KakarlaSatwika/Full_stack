
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private api = `${environment.apiUrl}/bookings`;
  constructor(private http: HttpClient) {}

  create(payload: any): Observable<any> { return this.http.post(this.api, payload); }
  getAll(): Observable<any[]> { return this.http.get<any[]>(this.api); }
  getById(id: number) { return this.http.get(`${this.api}/${id}`); }
  delete(id: number) { return this.http.delete(`${this.api}/${id}`); }
    
    createBooking(payload: any): Observable<any> {
    return this.http.post(this.api, payload);
  }

  getBookings(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }
}
