import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { ActivatedRoute,Params,Router } from '@angular/router';

import { Recipe } from '../recipe.model';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
   recipe: Recipe;
   id:number;

  constructor(private recipeService:RecipeService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      this.id=+params['id']
      this.recipe=this.recipeService.getRecipe(this.id)
    })
  }


  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)

  } 
  onDeleteRecipeItem(){
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['/recipes'])
  }
}
