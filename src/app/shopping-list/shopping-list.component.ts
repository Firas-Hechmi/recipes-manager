import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { empty, Subscription } from 'rxjs';
import { ShoppingList } from '../models/ShoppingList.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredientForm : any;
  shoppingList : ShoppingList[]=[];
  shoppingListSubscription : Subscription=empty().subscribe();
  index : number=-1;
  edit=false;
  constructor(private formBuilder : FormBuilder,private shoppingListService :ShoppingListService) { 
  }

  ngOnInit(): void {
    this.shoppingListSubscription=this.shoppingListService.shoppingListSubjet.subscribe(
      (shoppingList)=>{
        this.shoppingList=shoppingList;
      }
    );
    this.shoppingListService.emitShoppingListSubjet();

    this.ingredientForm=this.formBuilder.group({
        name:['',Validators.required],
        amount:[0,Validators.min(1)],
        recipe:['',Validators.required]
   });
  }
  
  onSubmitForm(){
     const formValue=this.ingredientForm.value;
     if(!this.edit){
       this.shoppingListService.addIngredient(formValue);
     }else{
        this.shoppingListService.updateIngredient(this.index,formValue);
     }
  } 

  onDelete(){
    if(this.edit){
      this.shoppingListService.deleteIngredient(this.index);
      this.onClear();
      this.edit=false;
    }
  }
  setIndex(index : number){
    this.index=index;
    this.edit=true;
    let ingredient=this.shoppingListService.getRecipeByIndex(index);
    this.ingredientForm=this.formBuilder.group({
      name:ingredient.name,
      amount:ingredient.amount,
      recipe:ingredient.recipe
    });
  }
  onClear(){
    this.ingredientForm=this.formBuilder.group({
      name:'',
      amount:0,
      recipe:''
     });
  }
  ngOnDestroy():void{
    this.shoppingListSubscription.unsubscribe();
  }

}
