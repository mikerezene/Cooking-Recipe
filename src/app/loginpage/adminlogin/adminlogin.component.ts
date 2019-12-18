import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/AuthService';
import { LoginModel } from '../../models/LoginModel';
import { UserService } from '../../services/UserService';
import { User } from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  loginModel = new LoginModel();
  users: User[];
  authService: AuthService;
  userService: UserService;

  message :string ="";

  constructor(authService: AuthService, userService: UserService , private router:Router) {
    this.authService = authService;
    this.userService = userService;
  }

  adminlogin() {
    this.authService.adminlogin(this.loginModel)
      .then(res => {

        this.message = "logged in";
        this.router.navigate(['/removeitem'])
        
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








  // adminregister(){
  //   this.authService.registerAdmin(this.loginModel)
  //     .toPromise()
  //     .then(res => {
        
  //       this.message = res.json().msg

      
  //   });
  // }