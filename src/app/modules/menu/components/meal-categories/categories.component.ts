import { Component } from '@angular/core';
import { MealCategoriesT } from 'src/app/modules/shared/services/meal-categories/meal-categories.model';
import { MealCategoriesService } from 'src/app/modules/shared/services/meal-categories/meal-categories.service';

@Component({
  selector: 'app-meal-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class MealCategoriesComponent {
  constructor(private MealCategoriesService: MealCategoriesService) {}

  mealCategories: MealCategoriesT[] = this.MealCategoriesService.mealCategories;
  selectedMealCategory = this.MealCategoriesService.selectedMealCategory;

  private readonly categoryFallbacks: string[] = [
    'https://images.unsplash.com/photo-1565299585323-38174c2b3c0e?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop',
    './assets/images/logo/qomander.svg'
  ];

  getCategoryImageSrc(category: MealCategoriesT): string {
    return category.picture || this.categoryFallbacks[this.categoryFallbacks.length - 1];
  }

  onCategoryImageError(event: any, category: MealCategoriesT) {
    const currentSrc = event.target.src;
    const currentIndex = this.categoryFallbacks.findIndex(f => currentSrc.includes(f.split('?')[0]));
    
    if (currentIndex >= 0 && currentIndex < this.categoryFallbacks.length - 1) {
      event.target.src = this.categoryFallbacks[currentIndex + 1];
    } else if (!currentSrc.includes(this.categoryFallbacks[this.categoryFallbacks.length - 1])) {
      event.target.src = this.categoryFallbacks[this.categoryFallbacks.length - 1];
    }
  }

  setMealCategory(index: number) {
    this.MealCategoriesService.setMealCategory(index);
  }
}
