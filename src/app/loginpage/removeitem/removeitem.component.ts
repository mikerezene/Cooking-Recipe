import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/AuthService';
import { LoginModel } from '../../models/LoginModel';
import { ProfileModel } from '../../models/profile.model';
import { Recipe } from '../../recipe.model';
import { AddRecipe } from '../../addrecipe.model';
import { RecipeService } from "../../recipes.service";
import { Router } from "@angular/router";
import { Http,Response } from "@angular/http";

@Component({
  selector: 'app-removeitem',
  templateUrl: './removeitem.component.html',
  styleUrls: ['./removeitem.component.css']
})
export class RemoveitemComponent implements OnInit {
  username : string;
  recipes : Recipe [] ;
 recipe_specific :Recipe [];
  constructor(private authService: AuthService , private recipeservice : RecipeService ,private router:Router
  ,private http: Http) { 


   this.recipeservice.read_data().then(recipes => {
     this.recipes = recipes;

     this.jsonToObjectConverter2(this.recipes);
   for (let i = 0; i < this.recipe_specific.length; i++) {
        this.recipe_specific[i].arrayStar = Array(this.recipe_specific[i].rate);
        console.log(this.recipe_specific[i].arrayStar);
        this.recipe_specific[i].arrayNoStar = Array(5 - this.recipe_specific[i].rate);
     }
        //  console.log(this.recipes);
         console.log(this.recipe_specific);
      });
  }

remove(y){
     this.http.request("http://localhost:3000/remove_item?remove="+y).subscribe((res: Response) => {
     this.recipeservice.read_data().then(recipes => {
     this.recipes = recipes;
     this.jsonToObjectConverter2(this.recipes);
        for (let i = 0; i < this.recipe_specific.length; i++) {
        this.recipe_specific[i].arrayStar = Array(this.recipe_specific[i].rate);
        console.log(this.recipe_specific[i].arrayStar);
        this.recipe_specific[i].arrayNoStar = Array(5 - this.recipe_specific[i].rate);
     }

    });
     });

     }
       jsonToObjectConverter2(each_json : Object[])  {
    var temp: Recipe[] = [];
    for(let l=0;l<each_json.length;l++){
          
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

       console.log(temp);      
   this.recipe_specific = temp;
}
  ngOnInit() {
  }

}
