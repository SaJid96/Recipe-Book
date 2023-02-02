import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../services/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangeSub: Subscription;
  constructor(private slservice: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.slservice.getIngredients();
    this.igChangeSub = this.slservice.ingrediantChanged.subscribe(
      (ingrdient: Ingredient[]) => (this.ingredients = ingrdient)
    );
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
  onEditItem(index: number) {
    this.slservice.startediting.next(index);
  }
}
