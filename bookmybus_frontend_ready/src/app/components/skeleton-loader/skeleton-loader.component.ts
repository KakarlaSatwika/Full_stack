import { Component, Input } from '@angular/core';
import { scaleIn } from '../../animations';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.css'],
  animations: [scaleIn]
})
export class SkeletonLoaderComponent {
  @Input() type: 'card' | 'table' | 'form' | 'text' = 'card';
  @Input() count: number = 1;
  @Input() show: boolean = true;

  get skeletonItems(): number[] {
    return Array(this.count).fill(0);
  }
}
