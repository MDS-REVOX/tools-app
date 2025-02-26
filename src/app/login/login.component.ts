import { Component } from '@angular/core';
import { Validators,FormControl,FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { LoginService } from '../services/LoginService';
import { Router } from '@angular/router';
import { LocalService } from '../services/LocalStorageService';
import { jwtDecode  } from 'jwt-decode';

@Component({
  selector: 'login',
  standalone: true,
  imports: [ ReactiveFormsModule, FormsModule, 
    ButtonModule, InputTextModule, PanelModule, CardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    loginForm = new FormGroup({
        'login': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required)
    });

    constructor(private loginServ: LoginService, private router: Router, private storageServ: LocalService){

    }
    ngOnInit() {
      this.loginForm = new FormGroup({
          'login': new FormControl('', Validators.required),
          'password': new FormControl('', Validators.required)
      });
    }
    
    doLogin() {
      if(!this.loginForm.valid){
        return;
      }
      let row = this.loginForm.getRawValue();
      let password = row.password?.toString();
      let login = row.login?.toString();

      if(password != null && login != null){
        this.loginServ.login(login, password).subscribe({
          next: (response) => {
              const token = response.headers.get('Authorization');
              const rtoken = response.headers.get('Set-Cookie');
              const rtoken2 = this.getCookie('refreshToken');
              const b = response.body;
              console.log("Message body:", b);
              if (token) {
                  const decodedToken = this.decodeJwt(token);
                  const refreshToken = this.getCookie('refreshToken'); // On va essayer de récupérer le refreshToken du cookie
                  if (refreshToken) {
                      const decodedRefreshToken = this.decodeJwt(refreshToken);
                      localStorage.setItem('refresh-token', refreshToken); // Si nécessaire
                  }
                  
                  const expirationDate = decodedToken.exp * 1000; // convertir en millisecondes
                  console.log("expirationDate Token:", expirationDate);
                  console.log("Authorization Token:", token);
                  localStorage.setItem('token', token); // Si nécessaire
                  localStorage.setItem('token_expiration', expirationDate.toString());

                  if(this.loginServ.isLoggedIn()){
                    this.router.navigate(['cbot'], {});
                  }
              } else {
                  console.error("Authorization header is missing!");
              }
          },
          error: (err) => {
              console.error("Login failed:", err);
          },
      });
      }
    }
    logout(){
      this.router.navigate([''], {});
      this.storageServ.clear();
    }
    // Décoder un JWT pour obtenir ses informations
  decodeJwt(token: string): any {
    console.log(jwtDecode);
    let decode = jwtDecode(token);
    if(decode){
      return decode;
    }
    return null;
  }

  // Fonction pour récupérer un cookie spécifique
  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }

}



