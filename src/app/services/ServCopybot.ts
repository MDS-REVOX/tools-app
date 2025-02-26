import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Account } from '../copybot/datas/Account';
import { Trader } from "../copybot/datas/Trader";
import { Config } from "../Config";

@Injectable({providedIn: 'root'})
export class ServCopybot{
    url: string = "";
    headers: HttpHeaders= new HttpHeaders();

    constructor(private http: HttpClient, private config: Config){
        this.url = this.config.getWsUrl() +  "/copy-bot/";
        this.headers.append('Content-Type','application/json');
        this.headers.append('Access-Control-Allow-Origin','localhost:4200');
        this.headers.append('Host',this.config.getDomain());
        // headers.append('Authorization',this.basic);
        //let options = new RequestOptions({headers:headers});
    }

    toggle(acc: Account){
        console.log(JSON.stringify(acc));
        return this.http.post(this.url+ "toggle", { Account: acc });
    }

    saveAccount(acc: Account){
        return this.http.post(this.url+ "account-save", {Account: acc}, {
            headers: this.headers
        });
    }

    allAccounts(): Observable<Account[]>{
        return this.http.get<Account[]>(this.url + 'accounts');
    }

    killCopyBot() : Observable<Boolean>{
        return this.http.post<Boolean>(this.url + 'killCopyTrades', undefined, {
            headers: this.headers
        });
    }

    loadTraders() : Observable<Array<Trader>>{
        return this.http.get<Array<Trader>>(this.url+'traders');
    }
    loadFollowers(MasterId:number): Observable<Account[]>{
        let params = new URLSearchParams();
        params.append("masterId", MasterId.toString());
        return this.http.get<Account[]>(this.url+'followers?masterId='+MasterId);
    }
    loadTradersByFollower(followerId:number): Observable<Account[]>{
        return this.http.get<Account[]>(this.url+'traders/by-follower?followerId='+followerId);
    }
    // loadTradersByFollower(followerId:number){
    //     return this.http.get(this.url+'traders/by-follower?followerId='+followerId, {
    //         headers: this.headers
    //     });
    // }

    postFollowing(masterId: number, followerId: number, follow: boolean){
        return this.http.post<Number>(this.url + 'following', {masterId: masterId, followerId: followerId, follow: follow});
    }


    loadActifs(){
        return [{id: 0, code: "DAX", lastPrice: 18495, enabled: 1}, {id: 1, code: "CAC40", lastPrice: 7458, enabled: 1}]
    }
}