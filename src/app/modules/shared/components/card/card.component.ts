import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() cardData!: any;
  @Output() cardClickedEvent = new EventEmitter<any>();

  currentImageSrc: string = '';
  fallbackIndex: number = 0;
  private readonly fallbacks: string[] = [
    'https://images.unsplash.com/photo-1565299585323-38174c2b3c0e?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop',
    './assets/images/logo/qomander.svg'
  ];

  ngOnInit() {
    this.currentImageSrc = this.cardData?.picture || this.fallbacks[this.fallbacks.length - 1];
  }

  onImageError() {
    if (this.fallbackIndex < this.fallbacks.length - 1) {
      this.currentImageSrc = this.fallbacks[this.fallbackIndex];
      this.fallbackIndex++;
    } else {
      this.currentImageSrc = this.fallbacks[this.fallbacks.length - 1];
    }
  }

  cardClicked() {
    this.cardClickedEvent.emit(this.cardData);
  }
}
