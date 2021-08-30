import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/models/Ingredient.model';
import { Recipe } from 'src/app/models/Recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe : any={};
  editMode=false;
  recipeForm : any;
  constructor(private route : ActivatedRoute,private recipesService: RecipesService,private router :Router,private formBuilder :FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(
       (params : Params)=>{
         const id=+params['id'];
         this.editMode= params['id'] != null;
         this.recipe=this.recipesService.getRecipeById(id);
         this.initForm();
       }
    );
  }
  initForm(){
    let name="";
    let description="";
    let image="assets/img/";
    let ingredients=this.formBuilder.array([]);
    if(this.editMode){
      name=this.recipe.name;
      description=this.recipe.description;
      image=this.recipe.image;
      for(let ingredient of this.recipe.ingredients){
         let ingredientForm=this.formBuilder.group(
           {
             name :[ingredient.name,Validators.required],
             amount:[ingredient.amount,Validators.required]
           }
         )
         ingredients.push(ingredientForm);
      }
    }

    this.recipeForm=this.formBuilder.group({
      name:[name,Validators.required],
      image:[image,Validators.required],
      description:[description,Validators.required],
      ingredients :ingredients  
    })
     
  }
  getIngredients(): FormArray{
    return this.recipeForm.get('ingredients') as FormArray;
}
onAddIngredient(){
  let ingredient : FormGroup;
  ingredient=this.formBuilder.group(
       {
         name:['',Validators.required],
         amount:[0,Validators.required]
       }
  );
  this.getIngredients().push(ingredient);
}
onDeleteIngredient(index : number){
  this.getIngredients().removeAt(index);
}
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});

  }
  onSubmitForm(){
    let name=this.recipeForm.value['name'];
    let description=this.recipeForm.value['description'];
    let image=this.recipeForm.value['image'];
    let ingredients=this.recipeForm.value['ingredients'];
    if(this.editMode){
       this.recipesService.updateRecipe(
           this.recipe.id,
           name,
           description ,
           image,
           ingredients
        );
    }else{
        this.recipesService.addRecipe(
           name,
           description,
           image,
           ingredients
        );
    }

    this.onCancel();
   }

}
