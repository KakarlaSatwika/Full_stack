import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { BusService } from '../../services/bus.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html'
})
export class BookingFormComponent implements OnInit {
  bus: any;
  name = '';
  email = '';
  seats = 1;
  error = '';
  success = '';

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private busService: BusService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.busService.getById(id).subscribe(bus => this.bus = bus);
  }

  book() {
    const payload = {
      busId: this.bus.id,
      name: this.name,
      email: this.email,
      seats: this.seats
    };

    this.bookingService.createBooking(payload).subscribe({
      next: () => {
        this.success = 'Booking successful!';
        setTimeout(() => this.router.navigate(['/buses']), 1500);
      },
      error: (err) => {
        this.error = err.error || 'Booking failed!';
      }
    });
  }
}
