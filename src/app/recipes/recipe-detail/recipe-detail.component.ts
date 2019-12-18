import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../recipes.service';
import { Recipe } from '../../recipe.model';
import { AuthService } from "../../services/AuthService";
import { ProfileModel } from "../../models/profile.model"
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  y: string;
  username: string;
  recipes: Recipe[];
  recipe_specific: Recipe[];
  profile_specific: ProfileModel[];
  profile_one: ProfileModel[];
  tobesent: string;
  tobesent2: string;
  imgSrcs = [];
  currentrate: number;
  user_rating: number;
  count: number;
  id: string;
  constructor(private authService: AuthService, private recipeservice: RecipeService) {
    this.recipeservice.read_data().then(recipes => {
      this.recipes = recipes;
    });
    this.recipeservice.itemsOnClick.subscribe((x: string) => {
      this.imgSrcs = [];
      for (let i = 0; i < 5; i++) {
        this.imgSrcs.push('/assets/images/star1.png');
      }
      this.y = x;
      if (this.y != this.id) {
        //  this.imgSrcs = [];
        // //  this.RatingSystem();
      }
      this.jsonToObjectConverter(this.recipes);

      this.authService.readProfile().then(profile_data => {
        this.profile_one = profile_data;
        this.tobesent = this.authService.username;
        this.jsonToObjectConverter2(this.profile_one);

      });

    });

  }


  RatingSystem() {
    if (this.count != 0) {
      for (var i = 0; i < this.recipes.length; i++) {
        if (this.recipes[i].id = this.id) {
          console.log("")
          this.recipes[i].rate = 4;
        }

      }
      this.count++
    }
  }

  jsonToObjectConverter(each_json: Object[]) {
    var temp: Recipe[] = [];
    this.username = "";

    for (let l = 0; l < each_json.length; l++) {
      console.log(each_json[l]["id"]);
      console.log(this.y)
      if (each_json[l]["id"] == this.y) {
        this.username = each_json[l]["username"];
        console.log(each_json[l]["id"]);
        temp.push(new Recipe(each_json[l]["id"],
          each_json[l]["title"], each_json[l]["username"],
          each_json[l]["discription"],
          each_json[l]["step0"], each_json[l]["step1"],
          each_json[l]["step2"],
          each_json[l]["step3"], each_json[l]["step4"], each_json[l]["step5"],
          each_json[l]["rate"], each_json[l]["imagePath1"], each_json[l]["imagePath2"],
          each_json[l]["imagePath3"], each_json[l]["imagePath4"], each_json[l]["imagePath5"],
          each_json[l]["imagePath6"]));

      }
      console.log("Check this out");
      console.log(temp);

    }


    this.recipe_specific = temp;
  }

  jsonToObjectConverter2(array: ProfileModel[]) {
    var temp: ProfileModel[] = [];
    for (let l = 0; l < array.length; l++) {
      console.log(array[l]["username"]);
      console.log(this.username);
      if (array[l]["username"] == this.username) {
        temp.push(new ProfileModel(array[l]["id"], array[l]["username"], array[l]["password"],
          array[l]["firstname"], array[l]["lastname"], array[l]["about"], array[l]["imagePath"]));

      }
      this.profile_specific = temp;
      console.log(this.profile_specific);
    }
  }

  ngOnInit() {
    for (let i = 0; i < 5; i++) {
      this.imgSrcs.push('/assets/images/star1.png');
    }
  }

  onRateClicked(index: number) {
    this.user_rating = index;
    for (let i = 0; i < index; i++) {
      this.imgSrcs[i] = '/assets/images/star2.png';
    }
    for (let j = index; j < 5; j++) {
      this.imgSrcs[j] = '/assets/images/star1.png';
    }
  }

  submitRating() {
    this.recipeservice.newRating.emit({id: this.y, rating: this.user_rating});
    
  }
}

