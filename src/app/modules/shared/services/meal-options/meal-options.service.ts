import { Injectable } from '@angular/core';
import REMOVE_INGREDIENTS_JSON from '../../../../../assets/db/options/remove-ingredients.json';
import EXTRAS_JSON from '../../../../../assets/db/options/extras.json';
import { MealOptionsT, StepsT } from './meal-options.model';
import { MealListT } from '../meal-list/meal-list.model';

@Injectable({
  providedIn: 'root',
})
export class MealOptionsService {
  constructor() {}

  private _selectedMeal: MealListT = {} as MealListT;
  private _selectedMealOptions: MealOptionsT[] = [];
  private _removedIngredients: MealOptionsT[] = [];
  private _addedExtras: MealOptionsT[] = [];
  private _specialInstructions: string = '';
  private _selectedMealOptionsTotalPrice = 0;
  private _selectedMealQuantity: number = 1;
  // ~~ UPDATES ~~ //

  setSelectedMeal(meal: MealListT) {
    this._selectedMeal = meal;
  }

  setSelectedMealOptions(selectedOptions: MealOptionsT[], currentStepIndex: number) {
    const steps = this.steps;
    
    // Separate removed ingredients and extras
    if (steps[currentStepIndex].name === 'removeIngredients') {
      this._removedIngredients = selectedOptions;
    } else if (steps[currentStepIndex].name === 'addExtras') {
      this._addedExtras = selectedOptions;
    }
    
    // Only extras contribute to price
    this._selectedMealOptions = this._addedExtras;
    //* THANKGOD for `flatMap`
  }

  setSpecialInstructions(instructions: string) {
    this._specialInstructions = instructions;
  }

  setSelectedMealQuantity(op: '+' | '-'): number {
    if (op === '+') {
      ++this._selectedMealQuantity;
    } else {
      if (this._selectedMealQuantity > 1) {
        --this._selectedMealQuantity;
      }
    }
    return this._selectedMealQuantity;
  }

  // ~~ RETURNS ~~ //

  get steps(): StepsT[] {
    return [
      {
        name: 'removeIngredients',
        heading: 'Remove Ingredients',
        canSelect: 0,
        options: this.removeIngredientsOptions,
        selectedOptions: this._removedIngredients,
        isTextInput: false,
      },
      {
        name: 'addExtras',
        heading: 'Add Extras',
        canSelect: 0,
        options: this.extrasOptions,
        selectedOptions: this._addedExtras,
        isTextInput: false,
      },
      {
        name: 'specialInstructions',
        heading: 'Special Instructions',
        canSelect: 0,
        options: [] as MealOptionsT[],
        selectedOptions: [] as MealOptionsT[],
        isTextInput: true,
      },
    ];
  }

  get selectedMeal(): MealListT {
    return this._selectedMeal;
  }

  get selectedMealQuantity(): number {
    return this._selectedMealQuantity;
  }

  get selectedMealOptionsTotalPrice(): number {
    this.calculateSelectedMealOptionsTotalPrice();
    return this._selectedMealOptionsTotalPrice;
  }

  get selectedMealOptions(): MealOptionsT[] {
    return this._selectedMealOptions;
  }

  get removedIngredients(): MealOptionsT[] {
    return this._removedIngredients;
  }

  get addedExtras(): MealOptionsT[] {
    return this._addedExtras;
  }

  get specialInstructions(): string {
    return this._specialInstructions;
  }

  get removeIngredientsOptions(): MealOptionsT[] {
    return REMOVE_INGREDIENTS_JSON as MealOptionsT[];
  }

  get extrasOptions(): MealOptionsT[] {
    return EXTRAS_JSON as MealOptionsT[];
  }

  // ~~ PRIVATE ~~ //

  private calculateSelectedMealOptionsTotalPrice() {
    this._selectedMealOptionsTotalPrice = 0;
    this._selectedMealOptions.forEach((el) => (this._selectedMealOptionsTotalPrice += el.price));
  }
}
