import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/AuthService';
import { LoginModel } from '../../models/LoginModel';
import { ProfileModel } from '../../models/profile.model';
import { Recipe } from '../../recipe.model';
import { AddRecipe } from '../../addrecipe.model';
import { RecipeService } from "../../recipes.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-addrecipe',
  templateUrl: './addrecipe.component.html',
  styleUrls: ['./addrecipe.component.css']
})
export class AddrecipeComponent implements OnInit {
   recipes : Recipe [] ;
 recipe_specific :Recipe [];
 username1 : string;
 username : string;
  constructor(private authService: AuthService , private recipeservice : RecipeService ,private router:Router) { 


   this.recipeservice.read_data().then(recipes => {
     this.recipes = recipes;
     this.username = this.authService.username;
     console.log(this.username);
     this.jsonToObjectConverter2(this.recipes);
           for (let i = 0; i < this.recipe_specific.length; i++) {
        this.recipe_specific[i].arrayStar = Array(this.recipe_specific[i].rate);
        this.recipe_specific[i].arrayNoStar = Array(5 - this.recipe_specific[i].rate);
     }
  
        //  console.log(this.recipes);
         console.log(this.recipe_specific);
      });
  }
  jsonToObjectConverter2(each_json : Object[])  {
    var temp: Recipe[] = [];
    for(let l=0;l<each_json.length;l++){
      console.log(this.username);
      console.log(each_json[l]);
      console.log(each_json[l]["username"]);
      console.log(each_json[l]["username1"]);
        if (each_json[l]["username"] == this.username)
        {
          
          temp.push(new Recipe(each_json[l]["id"],
      each_json[l]["title"], each_json[l]["username"], 
      each_json[l]["discription"],
      each_json[l]["step0"], each_json[l]["step1"],
      each_json[l]["step2"],
      each_json[l]["step3"], each_json[l]["step4"], each_json[l]["step5"], 
      each_json[l]["rate"], each_json[l]["imagePath1"],
      each_json[l]["imagePath2"],
      each_json[l]["imagePath3"], each_json[l]["imagePath4"], each_json[l]["imagePath5"], 
      each_json[l]["imagePath6"]));
        }
        console.log(each_json[l]["rate"]);

      }
       console.log(temp);      
   this.recipe_specific = temp;
}


  ngOnInit() {
  }

}
