import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes,RouterModule } from '@angular/router';
import { UserService } from './services/UserService';
import { AuthService } from './services/AuthService';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { SignuppageComponent } from './loginpage/signuppage/signuppage.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeItemComponent } from './recipes/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeService } from './recipes.service';
import { AdditemComponent } from './loginpage/additem/additem.component';
import { AddrecipeComponent } from './loginpage/addrecipe/addrecipe.component';
import { AdminloginComponent } from './loginpage/adminlogin/adminlogin.component';
import { RemoveitemComponent } from './loginpage/removeitem/removeitem.component';
import  {FileSelectDirective} from 'ng2-file-upload';

const appRoutes:Routes = [
  { path : 'recipedetail' ,component :RecipeDetailComponent},
    { path:'loginpage' , component : LoginpageComponent} ,
    { path:'signuppage' , component : SignuppageComponent} ,
    { path:'additem' , component : AdditemComponent} ,
     { path:'removeitem' , component : RemoveitemComponent} ,
     { path:'adminlogin' , component : AdminloginComponent} ,
     { path:'addrecipe' , component : AddrecipeComponent} ,
    { path:'recipes' , component : RecipesComponent} ,
     { path:'' , component : HomepageComponent} 
  ];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginpageComponent,
    SignuppageComponent,
    RecipesComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    AdditemComponent,
    AddrecipeComponent,
    AdminloginComponent,
    RemoveitemComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
 
  ],
  providers: [UserService,AuthService,RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
