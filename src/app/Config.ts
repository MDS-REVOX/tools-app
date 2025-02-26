import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class Config {
    private domain = "api.mdossantos.fr";
    private domainDev = "localhost:8080";
    private isDev : boolean  = true;
    private wsDomain:string = "http://"+ this.domain;
    private wsDomainDev:string = "http://" + this.domainDev;

    constructor(){
    }


    public getWsUrl() {
        return this.isDev ? this.wsDomainDev : this.wsDomain;
    }

    public getDomain(){
        return this.isDev ? this.domainDev : this.domain;
    }
    

}