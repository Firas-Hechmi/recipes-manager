import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from 'src/app/models/Recipe.model';
import { ShoppingList } from 'src/app/models/ShoppingList.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
   recipe : any={};

  constructor(private recipesService: RecipesService,
              private route : ActivatedRoute,
              private router : Router,
              private shoppingListService : ShoppingListService
              ) { 
  }

  ngOnInit(): void {
    
    this.route.params
    .subscribe(
      (params: Params) => {
        const id = +params['id'];
        this.recipe = this.recipesService.getRecipeById(id);
      }
    );
    if(this.recipe===undefined){
       this.router.navigate(['/']);
    }
  }
  onDeleteRecipe(id : number){
    this.recipesService.deleteRecipe(id);
    this.router.navigate(['/']);
  }
  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo: this.route});
  }
  onToShoppingList(){
    for(let ingredient of this.recipe.ingredients){
      let newIngredientInShoppingList=new ShoppingList(ingredient.name,ingredient.amount,this.recipe.name);
      this.shoppingListService.addIngredient(newIngredientInShoppingList);
      this.router.navigate(['/shoppingList']);
    }
  }

}
