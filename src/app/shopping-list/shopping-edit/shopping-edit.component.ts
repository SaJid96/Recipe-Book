import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
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
  editedItem: Ingredient;

  @ViewChild('f', { static: false }) slForm: NgForm;
  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.subScription = this.slService.startediting.subscribe(
      (index: number) => {
        this.editItemindex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.slService.updateIngredient(this.editItemindex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode=false
    form.reset()
  }

  onClear(){
    this.slForm.reset()
    this.editMode=false
  }
  ngOnDestroy(): void {
    this.subScription.unsubscribe();
  }
}
