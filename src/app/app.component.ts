import { Component} from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Config } from './Config';

import { ButtonModule } from 'primeng/button';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
      ButtonModule,
      RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tools-app';
  wsIsReachable : boolean = false;
  error: any;
  constructor(private http: HttpClient, private config: Config, ){
    this.checkServices();
  }
  afterRender(){
    console.log("IS KNOW RENDERING");
  }
  checkServices(){
    this.http.get(this.config.getWsUrl()+ "/ping").subscribe(response=>{
      if(response instanceof HttpResponse){
        this.wsIsReachable = response.status === 200;
      }
    })
  }
}
