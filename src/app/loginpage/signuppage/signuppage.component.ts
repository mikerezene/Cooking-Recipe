import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/AuthService';
import { LoginModel } from '../../models/LoginModel';
import { UserService } from '../../services/UserService';
import { User } from '../../models/User';
import { Router } from '@angular/router'
import { FileUploader } from "ng2-file-upload"



@Component({
  selector: 'app-signuppage',
  templateUrl: './signuppage.component.html',
  styleUrls: ['./signuppage.component.css']
})
export class SignuppageComponent implements OnInit {

loginModel = new LoginModel();
  users: User[];
  authService: AuthService;
  userService: UserService;
  preview : boolean = false;
  message = "not logged in";
  path : string;


  // private uploader : FileUploader = new FileUploader({url : `http://localhost:3000/submit_task`});

  constructor(authService: AuthService, userService: UserService, private router:Router) {
    console.log(this.loginModel.imagePath);
    this.authService = authService;
    this.userService = userService;
  }

register(x,y) {
    var c=  y.split('\\');
    this.path = c[c.length-1];
    console.log(this.path);
    this.loginModel.imagePath = "/assets/images/"+this.path;
     console.log(this.loginModel.imagePath);
    this.authService.registerUser(this.loginModel)
      .toPromise()
      .then(res => {
        
        this.message = res.json().msg
        if(this.message != 'Username already exists.'){

          // this.loginModel.imagePath = "/assets/images/image4.jpg";
          
             this.router.navigate(['/additem']);
              // this.uploadFile()
        }
        else{
          this.preview = true;
        }
       

      
    });
  }

ngOnInit(){

}
// uploadFile() {
//   this.uploader.queue[0].upload();
// }
}








