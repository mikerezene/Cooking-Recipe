import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
   rating_top = [];
   recipes: Recipe[] =  [];
   rate_specific = [];
   recipe_specific : Recipe[] = [];
  constructor(private recipeservice : RecipeService){
   this.recipeservice.read_data().then(recipes => {
        console.log('called called');
        this.recipes = recipes;
  for (let i = 0; i < this.recipes.length; i++) {
        this.recipes[i].arrayStar = Array(this.recipes[i].rate);
        this.recipes[i].arrayNoStar = Array(5 - this.recipes[i].rate);
     }

        for(let i =0;i<this.recipes.length;i++){
          this.rating_top.push(this.recipes[i].rate);
        }
        this.rating_top.sort();
        console.log(this.rating_top);
           var lenghtUpdate = this.rating_top.length-1;

          for(let x = 0;x<4; x++){
            if(this.rate_specific.indexOf(this.rating_top[lenghtUpdate])==-1){
                   this.rate_specific.push(this.rating_top[lenghtUpdate]);
            }
            
            lenghtUpdate = lenghtUpdate -1 ;
        }
        console.log("This is the updated value ");
       console.log(this.rate_specific);
     for(let y=0;y<this.rate_specific.length;y++){
        for(let i=0;i<this.recipes.length;i++){
         
          if(this.recipes[i].rate == this.rate_specific[y]){
            if(this.recipe_specific.length < 4){
                   this.recipe_specific.push(this.recipes[i]);
            }
          
          }
        }
     }
        console.log(this.recipe_specific);
   });
  }


  ngOnInit() {
  }

}
