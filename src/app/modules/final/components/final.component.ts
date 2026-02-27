import { NotoficationService } from './../../shared/services/notification/notofication.service';
import { Router } from '@angular/router';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { MealListT } from '../../shared/services/meal-list/meal-list.model';
import { MealOptionsT } from '../../shared/services/meal-options/meal-options.model';
import { MealOptionsService } from '../../shared/services/meal-options/meal-options.service';
@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss'],
})
export class FinalComponent {
  constructor(
    private MealOptionsService: MealOptionsService,
    private NotoficationService: NotoficationService,
    private route: Router
  ) {}

  readonly selectedMeal: MealListT = this.MealOptionsService.selectedMeal;
  selectedOptions: MealOptionsT[] = this.MealOptionsService.selectedMealOptions;
  removedIngredients: MealOptionsT[] = this.MealOptionsService.removedIngredients;
  specialInstructions: string = this.MealOptionsService.specialInstructions;
  optionsTotalPrice: number = this.MealOptionsService.selectedMealOptionsTotalPrice;
  selectedMealQuantity = this.MealOptionsService.selectedMealQuantity;

  currentMealImageSrc: string = '';
  private mealImageFallbackIndex: number = 0;
  private readonly mealImageFallbacks: string[] = [
    'https://images.unsplash.com/photo-1565299585323-38174c2b3c0e?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop',
    './assets/images/logo/qomander.svg'
  ];

  getImageFallbacks(): string[] {
    return [
      'https://images.unsplash.com/photo-1565299585323-38174c2b3c0e?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=100&h=100&fit=crop',
      './assets/images/logo/qomander.svg'
    ];
  }

  onMealImageError() {
    if (this.mealImageFallbackIndex < this.mealImageFallbacks.length - 1) {
      this.currentMealImageSrc = this.mealImageFallbacks[this.mealImageFallbackIndex];
      this.mealImageFallbackIndex++;
    } else {
      this.currentMealImageSrc = this.mealImageFallbacks[this.mealImageFallbacks.length - 1];
    }
  }

  onOptionImageError(event: any, option: MealOptionsT) {
    const fallbacks = this.getImageFallbacks();
    const currentIndex = fallbacks.findIndex(f => event.target.src.includes(f.split('?')[0]));
    const nextIndex = currentIndex >= 0 && currentIndex < fallbacks.length - 1 ? currentIndex + 1 : fallbacks.length - 1;
    event.target.src = fallbacks[nextIndex];
  }

  get totalPrice(): number {
    return (this.selectedMeal.price + this.optionsTotalPrice) * this.selectedMealQuantity;
  }

  changeSelectedMealQuantity(op: '+' | '-') {
    this.selectedMealQuantity = this.MealOptionsService.setSelectedMealQuantity(op);
  }

  @ViewChild('optionsContainer') optionsContainer!: ElementRef<HTMLDivElement>;
  reset() {
    //sorry, too lazy to reset all the already modified vars, so i just refresh
    this.route.navigate(['/menu']).then(() => window.location.reload());
  }

  scrollEvent($event: WheelEvent) {
    let el = this.optionsContainer.nativeElement;
    el.scrollLeft += $event.deltaY < 0 ? -100 : 100;
  }

  notif() {
    this.NotoficationService.trigger();
  }

  ngOnInit() {
    this.NotoficationService.trigger(true);
    if (Object.keys(this.selectedMeal).length === 0) {
      this.route.navigate(['/menu']);
    }
    this.currentMealImageSrc = this.selectedMeal?.picture || this.mealImageFallbacks[this.mealImageFallbacks.length - 1];
    console.table(`Selected Meal : `);
    console.table(this.selectedMeal);
    console.log(`Selected Meal Quantity : `, this.selectedMealQuantity);
    console.table(`Selected Options : `);
    console.table(this.selectedOptions);
    console.log(`Selected Options Total Price :`, this.optionsTotalPrice);
  }
}
