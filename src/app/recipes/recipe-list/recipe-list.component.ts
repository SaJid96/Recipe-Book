import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';

import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipes: Recipe[]
  subScription:Subscription

  constructor(private recipeService:RecipeService) { }

  ngOnInit() {

   this.subScription= this.recipeService.recipeChanged.subscribe((recipe:Recipe[])=>{
      this.recipes=recipe
    })

  this.recipes=this.recipeService.getRecipes()
  }

ngOnDestroy(): void {
  this.subScription.unsubscribe()
}
}
