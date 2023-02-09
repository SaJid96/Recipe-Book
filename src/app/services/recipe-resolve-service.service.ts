import { Injectable } from '@angular/core';
import { Resolve,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { DataStorageService } from './data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolveServiceService implements Resolve<Recipe[]> {

  constructor(private data:DataStorageService,private recipeService:RecipeService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  
    const recipes=this.recipeService.getRecipes()
    if(recipes.length === 0){
      return this.data.fetchRecipes()

    }
    else{
      return recipes
    }

  }
}
