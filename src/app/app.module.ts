import { RouterModule,Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import {RecipesService} from './services/recipes.service';
import { ShoppingListService } from './services/shopping-list.service';
import { NoneComponent } from './none/none.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';


const appRoutes : Routes=[

    {path:'recipes',component:RecipesComponent,children:[
      {path:'',component:NoneComponent},
      {path:'new',component:RecipeEditComponent},
      {path :':id',component:RecipeDetailComponent},
      {path:':id/edit',component:RecipeEditComponent},
    ]},
  {path:'shoppingList',component:ShoppingListComponent},
  {path:'**',redirectTo:'recipes'}
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    NoneComponent,
    RecipeEditComponent,
    ShoppingListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [
    RecipesService,
    ShoppingListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
