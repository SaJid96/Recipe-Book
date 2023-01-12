import { Injectable,EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';


@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
 private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  
  ingrediantChanged=new EventEmitter<Ingredient[]>()
  
  
  
   constructor() { }

  getIngredients(){
    return this.ingredients.slice()
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingrediantChanged.emit(this.ingredients.slice())
  }

  addIngredients(ingredient:Ingredient[]){
    this.ingredients.push(...ingredient)
    this.ingrediantChanged.emit(this.ingredients.slice())

  }
}
