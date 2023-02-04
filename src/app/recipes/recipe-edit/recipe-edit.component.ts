import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute,Params } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  constructor(private route:ActivatedRoute,private recipeService:RecipeService) { }
  recipeForm:FormGroup
  id:number;
  editmode=false
  ngOnInit(): void {
  
    this.route
    .params
    .subscribe(
      (param:Params)=>
      {
         this.id=+param['id']
          this.editmode=param['id'] !=null
          
        })
  
  }

  private initForm(){
    let recipeName='';
    let recipeImagePath='';
    let recipeDescription='';

    if(this.editmode){
      const recipe=this.recipeService.getRecipe(this.id);
      recipeName=recipe.name;
      recipeImagePath=recipe.imagePath;
      recipeDescription=recipe.description;
    }
this.recipeForm=new FormGroup({
  'name':new FormControl(recipeName),
  'imagePath':new FormControl(recipeImagePath),
  'description':new FormControl(recipeDescription)
})

  }

}
