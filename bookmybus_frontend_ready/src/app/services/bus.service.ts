
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Bus {
  id?: number;
  name?: string;
  origin?: string;
  destination?: string;
  travelDate?: string;
  departureTime?: string;
  arrivalTime?: string;
  totalSeats?: number;
  availableSeats?: number;
  fare?: number;
}

@Injectable({ providedIn: 'root' })
export class BusService {
  private api = `${environment.apiUrl}/buses`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Bus[]> { return this.http.get<Bus[]>(this.api); }
  getById(id: number) { return this.http.get<Bus>(`${this.api}/${id}`); }
  search(origin: string, destination: string, date: string) {
    return this.http.get<Bus[]>(`${this.api}/search`, { params: { origin, destination, date } });
  }
  add(bus: Bus) { return this.http.post<Bus>(this.api, bus); }
  update(id: number, bus: Bus) { return this.http.put<Bus>(`${this.api}/${id}`, bus); }
  delete(id: number) { return this.http.delete(`${this.api}/${id}`); }
}
