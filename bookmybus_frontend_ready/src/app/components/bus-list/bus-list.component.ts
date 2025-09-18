
import { Component, OnInit } from '@angular/core';
import { BusService, Bus } from '../../services/bus.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html'
})
export class BusListComponent implements OnInit {
  buses: Bus[] = [];
  origin=''; destination=''; date='';

  constructor(private busService: BusService, private router: Router, public auth: AuthService) {}

  ngOnInit() { this.load(); }
  load() { this.busService.getAll().subscribe(b => this.buses = b); }

  search() {
    if (!this.origin || !this.destination || !this.date) { this.load(); return; }
    this.busService.search(this.origin, this.destination, this.date).subscribe(b => this.buses = b);
  }

  book(bus: Bus) {
    if (!this.auth.isLoggedIn()) { this.router.navigate(['/login']); return; }
    this.router.navigate(['/bus', bus.id, 'book']);
  }
}
