import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';

import { Recipe } from '../recipe.model';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[]

  constructor(private recipeService:RecipeService) { }

  ngOnInit() {

    this.recipeService.recipeChanged.subscribe((recipe:Recipe[])=>{
      this.recipes=recipe
    })

  this.recipes=this.recipeService.getRecipes()
  }


}
