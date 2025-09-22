import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent {
  @Output() seatsSelected = new EventEmitter<string[]>();

  // Seat layout configuration
  rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
  seatsPerRow: number = 8;
  selectedSeats: string[] = [];
  totalSeats: number = 48; // 6 rows * 8 seats

  // Generate seat layout
  getSeatsForRow(row: string): string[] {
    return Array.from({ length: this.seatsPerRow }, (_, i) => `${row}${i + 1}`);
  }

  // Toggle seat selection
  toggleSeat(seatId: string): void {
    const index = this.selectedSeats.indexOf(seatId);
    if (index > -1) {
      this.selectedSeats.splice(index, 1);
    } else {
      if (this.selectedSeats.length < 6) { // Maximum 6 seats per booking
        this.selectedSeats.push(seatId);
      }
    }
    this.seatsSelected.emit(this.selectedSeats);
  }

  // Check if seat is selected
  isSeatSelected(seatId: string): boolean {
    return this.selectedSeats.includes(seatId);
  }

  // Get seat status for styling
  getSeatClass(seatId: string): string {
    return this.isSeatSelected(seatId) ? 'seat-selected' : 'seat-available';
  }

  // Clear all selections
  clearSelection(): void {
    this.selectedSeats = [];
    this.seatsSelected.emit(this.selectedSeats);
  }
}
