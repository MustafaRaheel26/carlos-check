import { Router } from '@angular/router';
import { MealListT } from 'src/app/modules/shared/services/meal-list/meal-list.model';
import { MealOptionsService } from '../../shared/services/meal-options/meal-options.service';
import { Component, ViewChild } from '@angular/core';
import { MealOptionsT } from '../../shared/services/meal-options/meal-options.model';
import { MealOptionsListComponent } from './options-list/options-list.component';

@Component({
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.scss'],
})
export class CustomizationComponent {
  constructor(private MealOptionsService: MealOptionsService, private route: Router) {}

  @ViewChild(MealOptionsListComponent) optionsComponent!: MealOptionsListComponent;

  readonly selectedMeal: MealListT = this.MealOptionsService.selectedMeal;
  selectedOptions: MealOptionsT[] = this.MealOptionsService.selectedMealOptions;
  removedIngredients: MealOptionsT[] = this.MealOptionsService.removedIngredients;
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

  refreshVars() {
    // called from `options-list _ @Output`
    this.selectedOptions = this.MealOptionsService.selectedMealOptions;
    this.removedIngredients = this.MealOptionsService.removedIngredients;
    this.optionsTotalPrice = this.MealOptionsService.selectedMealOptionsTotalPrice;
  }

  changeSelectedMealQuantity(op: '+' | '-') {
    this.selectedMealQuantity = this.MealOptionsService.setSelectedMealQuantity(op);
  }

  backButton() {
    this.optionsComponent.backButton();
  }

  ngOnInit() {
    if (Object.keys(this.selectedMeal).length === 0) {
      this.route.navigate(['/menu']);
    }
    this.currentMealImageSrc = this.selectedMeal?.picture || this.mealImageFallbacks[this.mealImageFallbacks.length - 1];
  }
}
