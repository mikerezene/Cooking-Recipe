import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/AuthService';
import { LoginModel } from '../../models/LoginModel';
import { ProfileModel } from '../../models/profile.model';
import { Recipe } from '../../recipe.model';
import { AddRecipe } from '../../addrecipe.model';
import { RecipeService } from "../../recipes.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent implements OnInit {
 profile_specific:ProfileModel[]; 
 profile_one: ProfileModel[];
 path2 : string;
 tobesent2:string;
 addrecipe = new AddRecipe();
 tobesent:string;
 imgpath1:string;
 imgpath2:string;
 imgpath3:string;
 imgpath4:string;
 imgpath5:string;
 imgpath6:string;
  constructor(private authService: AuthService , private recipeservice : RecipeService ,private router:Router) { 


    this.authService.readProfile().then(profile_data => {
    this.profile_one = profile_data;
    this.tobesent = this.authService.username;
    console.log(this.tobesent);
    this.addrecipe.rate = 2;
    this.addrecipe.username = this.tobesent;
    console.log(this.addrecipe.username);
    this.jsonToObjectConverter(this.profile_one); 
  
   });


     
     
}

 Add(x,img1,img2,img3,img4,img5,img6) {
    var c1=  img1.split('\\');
    var c2=  img2.split('\\');
    var c3=  img3.split('\\');
    var c4=  img4.split('\\');
    var c5=  img5.split('\\');
    var c6=  img6.split('\\');
    this.imgpath1 = c1[c1.length-1];
    this.imgpath2 = c2[c2.length-1];
    this.imgpath3 = c3[c3.length-1];
    this.imgpath4 = c4[c4.length-1];
    this.imgpath5 = c5[c5.length-1];
    this.imgpath6 = c6[c6.length-1];
    console.log(this.path2);
    this.addrecipe.imagePath1 = "/assets/images/"+this.imgpath1;
    this.addrecipe.imagePath2 = "/assets/images/"+this.imgpath2;
    this.addrecipe.imagePath3 = "/assets/images/"+this.imgpath3;
    this.addrecipe.imagePath4 = "/assets/images/"+this.imgpath4;
    this.addrecipe.imagePath5 = "/assets/images/"+this.imgpath5;
    this.addrecipe.imagePath6 = "/assets/images/"+this.imgpath6;
    console.log(this.addrecipe.imagePath1);
    this.authService.add_data(this.addrecipe)
      .toPromise()
      .then((res) => {
        
        this.router.navigate(['/addrecipe']);
        
      
    });
  }

jsonToObjectConverter(array:ProfileModel[])  {
var temp: ProfileModel [] = [];
 for (let l = 0; l < array.length; l++) {
   console.log(this.tobesent2);
if ( array[l]["username"] == this.tobesent)
        {
     temp.push(new ProfileModel(array[l]["id"], array[l]["username"], array[l]["password"],
       array[l]["firstname"], array[l]["lastname"], array[l]["about"] ,array[l]["imagePath"]));

      } 
   this.profile_specific = temp;
   console.log(this.profile_specific);
  }
}


  ngOnInit() {





  }

}
