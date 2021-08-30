import { Component, OnDestroy, OnInit } from '@angular/core';
import { empty, Subscription } from 'rxjs';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipes : any[]=[];
  recipesSubscription : Subscription=empty().subscribe();
  constructor(private recipesService : RecipesService) {
  
   }

  ngOnInit(): void {
    this.recipesSubscription=this.recipesService.recipesSubject.subscribe(
      (recipes)=>{
        this.recipes=recipes;
      }
    )
    this.recipesService.emitRecipesSubject();
   
  }
  ngOnDestroy(): void{
   this.recipesSubscription.unsubscribe();
  }
  
}
