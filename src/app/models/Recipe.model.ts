import { Ingredient } from "./Ingredient.model";

export class Recipe{
   
    constructor(public id : number,
                public name : string,
                public description : string,
                public image : string,
                public ingredients : Ingredient[]
                ){}
       
}