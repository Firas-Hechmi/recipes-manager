import { Subject } from "rxjs";
import { ShoppingList } from "../models/ShoppingList.model";

export class ShoppingListService{
        shoppingListSubjet=new Subject<ShoppingList[]>();
     
        private shoppingList: ShoppingList[]=[
            new ShoppingList("ras zebi",3,"Pizza")
        ];

        emitShoppingListSubjet(){
            this.shoppingListSubjet.next(this.shoppingList.slice());
        }

        addIngredient(ingredient : ShoppingList){
           this.shoppingList.push(ingredient);
           this.emitShoppingListSubjet();
        }
        updateIngredient(index :number,recipe : ShoppingList){
            this.shoppingList[index]=recipe;
            this.emitShoppingListSubjet();
        }
        deleteIngredient(index : number){
            this.shoppingList.splice(index,1);
            this.emitShoppingListSubjet();
        }
        getRecipeByIndex(index : number){
            return this.shoppingList[index];
        }

}