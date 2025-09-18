
import { Component, OnInit } from '@angular/core';
import { BusService, Bus } from '../../services/bus.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {
  buses: Bus[] = [];
  bookings: any[] = [];
  editing: Bus | null = null;
  form: any = { name:'', origin:'', destination:'', travelDate:'', departureTime:'', arrivalTime:'', totalSeats:0, availableSeats:0, fare:0 };

  constructor(private busService: BusService, private bookingService: BookingService) {}

  ngOnInit() { this.load(); }
  load() {
    this.busService.getAll().subscribe(b => this.buses = b);
    this.bookingService.getAll().subscribe(bk => this.bookings = bk);
  }

  add() {
    this.busService.add(this.form).subscribe(()=>{ this.form = {name:'',origin:'',destination:'',travelDate:'',departureTime:'',arrivalTime:'',totalSeats:0,availableSeats:0,fare:0}; this.load(); });
  }

  edit(b: Bus) { this.editing = {...b}; this.form = {...b}; }
  update() {
    if (!this.editing) return;
    this.busService.update(this.editing.id!, this.form).subscribe(()=>{ this.editing = null; this.form = {name:'',origin:'',destination:'',travelDate:'',departureTime:'',arrivalTime:'',totalSeats:0,availableSeats:0,fare:0}; this.load(); });
  }

  cancelEdit() { this.editing = null; this.form = {name:'',origin:'',destination:'',travelDate:'',departureTime:'',arrivalTime:'',totalSeats:0,availableSeats:0,fare:0}; }

  delete(id?: number) {
    if (!id) return;
    if (!confirm('Delete bus?')) return;
    this.busService.delete(id).subscribe(()=>this.load());
  }
}
