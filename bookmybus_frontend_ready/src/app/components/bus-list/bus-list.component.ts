
import { Component, OnInit } from '@angular/core';
import { BusService, Bus } from '../../services/bus.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { fadeInOut, slideInLeft, slideInRight, scaleIn, listStagger } from '../../animations';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.css'],
  animations: [
    fadeInOut,
    slideInLeft,
    slideInRight,
    scaleIn,
    listStagger
  ]
})
export class BusListComponent implements OnInit {
  buses: Bus[] = [];
  origin = '';
  destination = '';
  date = '';
  isLoading = false;
  searchPerformed = false;
  isVisible = false;

  constructor(private busService: BusService, private router: Router, public auth: AuthService) {}

  ngOnInit() {
    this.load();
    // Trigger animations after component loads
    setTimeout(() => {
      this.isVisible = true;
    }, 100);
  }

  load() {
    this.isLoading = true;
    this.busService.getAll().subscribe({
      next: (buses) => {
        this.buses = buses;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading buses:', error);
        this.isLoading = false;
      }
    });
  }

  search() {
    if (!this.origin || !this.destination || !this.date) {
      this.load();
      return;
    }

    this.isLoading = true;
    this.searchPerformed = true;
    this.busService.search(this.origin, this.destination, this.date).subscribe({
      next: (buses) => {
        this.buses = buses;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error searching buses:', error);
        this.isLoading = false;
      }
    });
  }

  book(bus: Bus) {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/bus', bus.id, 'book']);
  }

  clearSearch() {
    this.origin = '';
    this.destination = '';
    this.date = '';
    this.searchPerformed = false;
    this.load();
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}
