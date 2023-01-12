import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../services/shopping-list.service';

import { Ingredient } from '../shared/ingredient.model';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] 

  constructor(private slservice:ShoppingListService) { }

  ngOnInit() {
    this.ingredients=this.slservice.getIngredients()
    this.slservice.ingrediantChanged.subscribe((ingrdient:Ingredient[])=>this.ingredients=ingrdient)  }

 
}
