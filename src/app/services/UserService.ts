import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { LoginModel } from "../models/LoginModel";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./AuthService";

@Injectable()
export class UserService {

    token: string;
    http: Http;
    authService: AuthService

    constructor(http: Http, authService: AuthService) {
        this.http = http;
        this.authService = authService;
    }

    getAllUsers(): Promise<Response> {
        var requestOptions = new RequestOptions();
        requestOptions.headers = new Headers();
        requestOptions.headers.append("Authorization", this.authService.token);
        return this.http.get('http://localhost:3000/api/users', requestOptions).toPromise();
    }


}