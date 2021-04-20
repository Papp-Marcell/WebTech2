import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authService'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) { }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot){
    if(this.authenticationService.loggedIn=="true"){
      return true
    }else{
      this.router.navigate([''], );
      return false
    }
    
  }
  
}
