import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Config } from "../Config";
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class LoginService{
    url = "";
    headers: HttpHeaders = new HttpHeaders();
     
    constructor(private http: HttpClient, private config: Config, private router: Router){
        this.url = this.config.getWsUrl() +  "/user/login";
        //this.headers.append('Content-Type','application/json');
        //this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        //this.headers.append('Host', this.config.getDomain());
        this.headers = new HttpHeaders()
            .append('Content-Type', 'application/json')  // Pour envoyer des données en JSON
    }

    login(login?: string, password?: string){
         let loginData = { login: login, password: password}; 
        return this.http.post<String>(this.url, loginData, {headers: this.headers, observe: 'response', withCredentials: true});
    }

    refreshAccessToken() {
        this.url = this.config.getWsUrl() +  "/user/refresh-token";
        const refreshToken = localStorage.getItem('refresh-token');  // Récupère le refreshToken du localStorage
        
        if (!refreshToken) {
            console.error('No refresh token found');  // Si aucun refreshToken n'est trouvé dans le localStorage
            return;  // Assurez-vous de retourner ici pour ne pas poursuivre la fonction sans valeur
        }
    
        // Préparer les données pour la requête : ici on passe le refreshToken
        const refreshData = { 
            username: localStorage.getItem('user'),  // Tu peux récupérer le username du user connecté, ici c'est un exemple
            refreshToken: refreshToken 
        };
    
        // Envoi de la requête POST pour rafraîchir le token
        return this.http.post<{ accessToken: string, refreshToken: string }>(
            this.url, 
            refreshData, 
            { headers: this.headers, observe: 'response', withCredentials: true }
        ).subscribe({
            next: (response) => {
                // Mettre à jour le localStorage avec les nouveaux tokens
                localStorage.setItem('token', response.body?.accessToken || '');  // Mettre à jour l'accessToken
                localStorage.setItem('refresh-token', response.body?.refreshToken || '');  // Mettre à jour le refreshToken
            },
            error: (error) => {
                console.error('Error refreshing token:', error);  // Gestion des erreurs
            }
        });
    }

    logout(){
        localStorage.clear();
        this.router.navigate([""]);
        //this.router.navigate([''], {});        
    }


    isLoggedIn() : boolean{
        if(localStorage !== undefined){
            let token = localStorage.getItem('token');
            return token != null && !this.isTokenExpired();    
        }
        return false;
    }

    isTokenExpired(): boolean {
        if(localStorage == undefined){
            return false;
        }
        const expiration = localStorage.getItem('token_expiration');
        if (!expiration) {
            return true; 
        }
        const expirationDate = new Date(parseInt(expiration));
        return new Date() > expirationDate; 
    }
}