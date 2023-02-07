import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray,Validators } from '@angular/forms';
import { ActivatedRoute, Params ,Router} from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router:Router
  ) {}
  
  
  recipeForm: FormGroup;
  id: number;
  editmode = false;
  
  
  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.editmode = param['id'] != null;
    });
    this.initForm();
  }
  onSubmit() {
  
    if(this.editmode){
      this.recipeService.updaterecipe(this.id,this.recipeForm.value)
    }
    else{
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.onCancel()
  }


  addIngredient(){
      (<FormArray>this.recipeForm.get('ingredients')).push(
        new FormGroup({
          'name':new FormControl(null,Validators.required),
          'amount':new FormControl(null,[
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
        })
      )
  }
  get controls(){
    return(<FormArray>this.recipeForm.get('ingredients')).controls
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    
    if (this.editmode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name,Validators.required),
              amount: new FormControl(ingredient.amount,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName,Validators.required),
      imagePath: new FormControl(recipeImagePath,Validators.required),
      description: new FormControl(recipeDescription,Validators.required),
      ingredients: recipeIngredients,
    });
  }
}
