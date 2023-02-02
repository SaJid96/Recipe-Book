import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subScription: Subscription;
  editMode = false;
  editItemindex: number;

  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.subScription = this.slService.startediting.subscribe(
      (index: number) => {
        this.editItemindex = index;
        this.editMode = true;
      }
    );
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.slService.addIngredient(newIngredient);
  }

  ngOnDestroy(): void {
    this.subScription.unsubscribe();
  }
}
