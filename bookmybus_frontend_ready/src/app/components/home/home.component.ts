
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      state('out', style({ opacity: 0, transform: 'translateY(-20px)' })),
      transition('out => in', animate('300ms ease-out')),
      transition('in => out', animate('300ms ease-in'))
    ])
  ]
})
export class HomeComponent implements OnInit {
  features = [
    {
      icon: '🚌',
      title: 'Wide Coverage',
      description: 'Thousands of routes across many cities and destinations.'
    },
    {
      icon: '🔒',
      title: 'Secure Payments',
      description: 'Safe and fast checkout with multiple payment options.'
    },
    {
      icon: '📞',
      title: '24/7 Support',
      description: 'We\'re here for you anytime, anywhere.'
    }
  ];

  isVisible = false;

  ngOnInit() {
    this.isVisible = true;

    // Initialize date input with tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateInput = document.getElementById('travelDate') as HTMLInputElement;
    if (dateInput) {
      dateInput.valueAsDate = tomorrow;
    }
  }

  onTabChange(service: string) {
    // Handle tab switching logic
    const tabs = document.querySelectorAll('.tab-item');
    tabs.forEach(tab => tab.classList.remove('active'));

    const activeTab = document.querySelector(`[data-service="${service}"]`);
    if (activeTab) {
      activeTab.classList.add('active');
    }
  }

  onSwapLocations() {
    const fromInput = document.getElementById('fromLocation') as HTMLInputElement;
    const toInput = document.getElementById('toLocation') as HTMLInputElement;

    if (fromInput && toInput) {
      const temp = fromInput.value;
      fromInput.value = toInput.value;
      toInput.value = temp;
    }
  }
}
