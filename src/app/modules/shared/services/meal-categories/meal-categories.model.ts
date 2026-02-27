export enum CategoriesE {
  tortas = 'Tortas',
  tortasSpecial = 'Tortas Special',
  tacos = 'Tacos',
  burritos = 'Burritos',
  flautas = 'Flautas',
  nachos = 'Nachos',
  superFries = 'Super Fries',
  mainDishes = 'Main Dishes',
  drinks = 'Drinks',
  desserts = 'Desserts',
}

export type MealCategoriesT = {
  name: CategoriesE;
  picture: string;
  key: keyof typeof CategoriesE;
};
