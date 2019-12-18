import {Injectable, EventEmitter} from '@angular/core'
import { Http, Response } from '@angular/http';
import { Recipe } from './recipe.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class RecipeService {
  // itemsOnClick2 = new EventEmitter<Object[]>();
  recipes: Recipe[] = [

    new Recipe("first_id", "Burger", "Mike", "What is up yo it worked", "hellothere", "hellother", "hellothe",
      "helloth", "hellot", "hello", 2, "/assets/images/image10.jpg", "/assets/images/image10.jpg",
      "/assets/images/image10.jpg", "/assets/images/image10.jpg", "/assets/images/image10.jpg",
      "/assets/images/image10.jpg")

  ];
  checker: string = "check123";
  itemsOnClick = new EventEmitter<string>();
  newRating = new EventEmitter<{id: string, rating: number}>();



  constructor(private http: Http) {
    this.read_data();
  }

  // readdata():void{
  //      this.http.request("http://localhost:3000/read_item").subscribe((res: Response) => {
  //       var resJson = res.json();

  //       return this.jsonToObjectConverter(resJson);
  //     });
  // }

  read_data(): Promise<Recipe[]> {

    return this.http.get("http://localhost:3000/read_item").toPromise().
      then((response) => {
        var resJson = response.json();
        return this.jsonToObjectConverter(resJson);
      });

  }

  jsonToObjectConverter(each_json: Object[]): Recipe[] {
    var json = each_json;
    var temp: Recipe[] = [];
    for (let l = 0; l < each_json.length; l++) {
      temp.push(new Recipe(each_json[l]["_id"], each_json[l]["title"],
        each_json[l]["username"], each_json[l]["discription"],
        each_json[l]["step0"], each_json[l]["step1"],
        each_json[l]["step2"], each_json[l]["step3"],
        each_json[l]["step4"], each_json[l]["step5"],
        each_json[l]["rate"], each_json[l]["imagePath1"], each_json[l]["imagePath2"],
        each_json[l]["imagePath3"], each_json[l]["imagePath4"],
        each_json[l]["imagePath5"], each_json[l]["imagePath6"]));
    }
    this.recipes = temp;
    return this.recipes;
  }

  updateRate(recipe_id: string, new_rate: number) {
    return this.http.put(`http://localhost:3000/update_rate/${recipe_id}`, {new_rate: new_rate});
  }
}


    // foods = [
    //     "cake"
    // ];

    // getFoodList(): string[]{
    //     return this.foods;
    // }