import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../../recipes.service';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],

})
export class RecipeItemComponent implements OnInit {

  recipes: Recipe[];

  constructor(private recipeservice : RecipeService){
   this.recipeservice.read_data().then(recipes => {
     this.recipes = recipes;
     this.updateRecipesRatings();
     console.log(this.recipes);
   });

   this.recipeservice.newRating.subscribe(
     (received: {id: string, rating: number}) => {
      //  console.log(id);
       for (let i = 0; i < this.recipes.length; i++) {
         console.log(this.recipes[i].id);
         if (this.recipes[i].id === received.id) {
           console.log('found and changing!');
          //  change here
          this.recipes[i].rate = Math.ceil((this.recipes[i].rate + received.rating) / 2);
          this.updateRecipesRatings();
          this.recipeservice.updateRate(this.recipes[i].id.toString(), this.recipes[i].rate)
              .subscribe(
                (response: Response) => {}
              )
          break;
         }
       }

     }
   );
  }

  itemsClicked(x: string) {
    console.log(this.recipes);
    this.recipeservice.itemsOnClick.emit(x);
  }

  updateRecipesRatings() {
    for (let i = 0; i < this.recipes.length; i++) {
        this.recipes[i].arrayStar = Array(this.recipes[i].rate);
        this.recipes[i].arrayNoStar = Array(5 - this.recipes[i].rate);
     }
  }

  ngOnInit() {

  }

}