import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public loggedIn : string;
    uri = environment.apiUrl;
    options = {
        autoClose: true,
        keepAfterRouteChange: false
    };  

    constructor(
        private httpClient: HttpClient,
        private router: Router,
        protected alertService: AlertService,
        ) {
        this.loggedIn=localStorage.getItem('loggedIn')
        
    }

    

    login(username: string, password: string) {
        const obj ={
            _username:username,
            _password:password  
          }
        let response;
        this.httpClient.post(`${this.uri}/app/login`, obj,{responseType:'text'}).subscribe(
            
            res => this.authenticate(res),
            error => this.alertService.error("Wrong Username or Password, please try again",this.options)
          );
        
    }

    authenticate(response:string)
    {
        console.log(response);
        if(response=="Success"){
            localStorage.setItem('loggedIn', "true");
            location.reload();
        }else{
            this.alertService.error("Wrong Username or Password, please try again",this.options)
        }
    }

    logout() {
        // remove user from local storage to log user out
        //localStorage.setItem('loggedIn','false');
        localStorage.removeItem('loggedIn');
        //this.router.navigate(['']);
        setTimeout(() => location.reload(),100);
    }
}