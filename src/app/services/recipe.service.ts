import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private slService:ShoppingListService) { }


  private recipes: Recipe[] = [
    new Recipe('A Test Recipe',
      'This is simply a test',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French fries', 20)
      ]),
    new Recipe(
      'Another Test Recipe',
      'This is simply a test',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg'
      ,
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])

  ];
  recipeSelected = new EventEmitter<Recipe>()
  

  getRecipes() {
    return this.recipes.slice()
  }

  addIngredientsToShoppingList(ingredient:Ingredient[]){
    this.slService.addIngredients(ingredient)
  }


}
