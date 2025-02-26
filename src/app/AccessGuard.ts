import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { Router } from "@angular/router";
import {LoginService} from "./services/LoginService";

@Injectable({ providedIn: 'root' })
export class AccessGuard implements CanActivate{
    constructor(private loginService: LoginService, private router: Router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        if(this.loginService.isLoggedIn()){
            return true; 
        }
        this.router.navigate([''], { });
        return false;
    }
}