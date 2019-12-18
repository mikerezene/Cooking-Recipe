import { Http, RequestOptions, Headers, Response } from "@angular/http";
import {Injectable, EventEmitter} from '@angular/core'
import { LoginModel } from "../models/LoginModel";
import { AddRecipe } from "../addrecipe.model"
import { Observable } from "rxjs/Observable";
import { ProfileModel } from "../models/profile.model";

@Injectable()
export class AuthService {

    private _token: string;
    http: Http;
    username : string;
    username1 : string;
    profile_data:Object[]=[];
    userClicked1 = new EventEmitter<string>();
    userClicked2 = new EventEmitter<string>();

    constructor(http: Http) {
        this.http = http;
         
    }

    get authenticated(): boolean {
        if (this.token == null) {
            return false;
        } else {
            return true;
        }
    }

    readProfile():Promise<ProfileModel[]> {

     return this.http.get("http://localhost:3000/readProfile").toPromise()
     .then((response) => {
      var resJson = response.json();
      return this.jsonToObjectConverter(resJson);
      
    });

}

    jsonToObjectConverter(each_json: ProfileModel[]) {
    var json = each_json;
    var temp: ProfileModel[] = [];
    for (let l = 0; l < each_json.length; l++) {
        
      temp.push(new ProfileModel(each_json[l]["_id"],each_json[l]["username"], each_json[l]["password"],
       each_json[l]["firstname"], each_json[l]["lastname"], each_json[l]["about"],each_json[l]["imagePath"]));
      
    }
    this.profile_data = temp;
    console.log(this.profile_data);
    return this.profile_data;

}

   adminlogin(loginModel: LoginModel): Promise<Response> {

        var requestOptions = new RequestOptions();
        requestOptions.headers = new Headers();
        requestOptions.headers.append("Content-Type", "application/json");
        var requestBody = JSON.stringify(loginModel);

        return this.http
            .post("http://localhost:3000/api/adminsignin", requestBody, requestOptions)
            .toPromise()
            .then(x => this._token = x.json().token)
         
    }





    login(loginModel: LoginModel): Promise<Response> {

        var requestOptions = new RequestOptions();
        requestOptions.headers = new Headers();
        requestOptions.headers.append("Content-Type", "application/json");
        var requestBody = JSON.stringify(loginModel);
        this.username = loginModel.username;
        console.log(this.username);
        
        return this.http
            .post("http://localhost:3000/api/signin", requestBody, requestOptions)
            .toPromise()
            .then(x => this._token = x.json().token);
    }

    logout() {
        this._token = null;
    }
    add_data(addrecipe : AddRecipe)  : Observable<Response> {
       var requestOptions = new RequestOptions();
        requestOptions.headers = new Headers();
        requestOptions.headers.append("Content-Type", "application/json");
        var requestBody = JSON.stringify(addrecipe);
        
        return this.http

            .post("http://localhost:3000/read_data", JSON.stringify(addrecipe), requestOptions);
    }

   registerAdmin(loginModel: LoginModel): Observable<Response> {
        var requestOptions = new RequestOptions();
        requestOptions.headers = new Headers();
        requestOptions.headers.append("Content-Type", "application/json");
        var requestBody = JSON.stringify(loginModel);

        return this.http

            .post("http://localhost:3000/api/adminsignup", JSON.stringify(loginModel), requestOptions);
    }


    registerUser(loginModel: LoginModel): Observable<Response> {
        var requestOptions = new RequestOptions();
        requestOptions.headers = new Headers();
        requestOptions.headers.append("Content-Type", "application/json");
        var requestBody = JSON.stringify(loginModel);
        this.username = loginModel.username;
        console.log(this.username);
        return this.http

            .post("http://localhost:3000/api/signup", JSON.stringify(loginModel), requestOptions);
    }

    get token(): string {
        return this._token;
    }

}