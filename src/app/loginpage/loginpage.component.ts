import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/AuthService';
import { LoginModel } from '../models/LoginModel';
import { UserService } from '../services/UserService';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

 loginModel = new LoginModel();
  users: User[];
  authService: AuthService;
  userService: UserService;

  message:string;

  constructor(authService: AuthService, userService: UserService , private router:Router) {
    this.authService = authService;
    this.userService = userService;
  }

  login(y) {
    this.authService.login(this.loginModel)
      .then(res => {

        this.message = "logged in";
        this.router.navigate(['/additem'])
        
      })
      .catch(
        res =>{
          this.message = res.json().msg;

        }
      );
  }

ngOnInit(){

}
}








  /*getUsers() {
    this.userService.getAllUsers()
      .then(res => {
        console.log(res.json());
        this.users = res.json().map(function (u) {
          var user = new User();
          user.name = u.name;
          
          return user;
        });
        console.log(this.users);
      });
    
  }*/