import { Subject } from "rxjs";
import { Ingredient } from "../models/Ingredient.model";
import { Recipe } from "../models/Recipe.model";

export class RecipesService{

    recipesSubject=new Subject<any[]>();
    
    private recipes=[
        {
          id : 1,
          name : "Pizza",
          image :"assets/img/pizza.jpg",
          description : "Best homemade pizza :)",
          ingredients : [{name :"cheese",amount:3},{name : "tomato",amount :4},{name : "olive",amount :6},{name:"farine",amount:350}]
        },{
          id : 2,
          name : "Burger",
          image :"assets/img/burger.jpg",
          description : "Tasty american burger ",
          ingredients : [{name:"bread",amount:1},{name :"cheese",amount:2},{name : "tomato",amount :3},{name:"burger",amount:2},{name:"onion",amount:1}]
        }
      ]
      emitRecipesSubject(){
        this.recipesSubject.next(this.recipes.slice());
      }
      getRecipeById(id: number){
        let recipe=this.recipes.find(
          (recipeObject)=>{
            return recipeObject.id===id;
          }
        );
        return recipe;
      }
      deleteRecipe(id : number){
        let i=0;
        let find=false;
        while(!find && i<this.recipes.length){
          if(this.recipes[i].id===id){
            this.recipes.splice(i,1);
            find=true;
            this.emitRecipesSubject();
          }else{
            i++;
          }
        }

      }
    addRecipe(name : string,description : string,image : string,ingredients : Ingredient[]){
      const id=this.recipes[this.recipes.length-1].id+1;
      const newRecipe=new Recipe(id,name,description,image,ingredients);
      this.recipes.push(newRecipe);
      this.emitRecipesSubject();
    }
    updateRecipe(id : number,name : string,description : string,image : string,ingredients : Ingredient[]){
      const newRecipe=new Recipe(id,name,description,image,ingredients);
      let update=false;
      let i=0;
      while(!update && i<this.recipes.length){
        if(this.recipes[i].id===id){
            this.recipes[i]=newRecipe;
            update=true;
            this.emitRecipesSubject();
        }else{
          i++;
        }
      }
    }
}