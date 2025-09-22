import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { BusService } from '../../services/bus.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  bus: any;
  name = '';
  email = '';
  seats = 1;
  selectedSeats: string[] = [];
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
    this.loadBus(id);
  }

  loadBus(id: number) {
    this.busService.getById(id).subscribe({
      next: (bus) => {
        this.bus = bus;
      },
      error: (error) => {
        console.error('Error loading bus:', error);
        this.error = 'Failed to load bus details. Please try again.';
      }
    });
  }

  onSeatsSelected(seats: string[]) {
    this.selectedSeats = seats;
  }

  book() {
    // Clear previous messages
    this.error = '';
    this.success = '';

    // Validation
    if (!this.name.trim() || !this.email.trim() || this.seats < 1) {
      this.error = 'Please fill in all fields correctly.';
      return;
    }

    if (this.seats > 10) {
      this.error = 'Maximum 10 seats allowed per booking.';
      return;
    }

    // Validate seat selection
    if (this.selectedSeats.length !== this.seats) {
      this.error = `Please select exactly ${this.seats} seat(s) from the seat map.`;
      return;
    }

    const payload = {
      busId: this.bus.id,
      name: this.name.trim(),
      email: this.email.trim(),
      seats: this.seats,
      selectedSeats: this.selectedSeats
    };

    this.bookingService.createBooking(payload).subscribe({
      next: () => {
        this.success = `🎉 Booking successful! ${this.seats} seat(s) reserved for ${this.bus.name}. Seats: ${this.selectedSeats.join(', ')}.`;
        setTimeout(() => {
          this.router.navigate(['/buses']);
        }, 3000);
      },
      error: (err) => {
        this.error = err.error?.message || 'Booking failed! Please try again.';
      }
    });
  }
}
