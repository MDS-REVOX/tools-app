import { afterNextRender, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ServCopybot } from '../../services/ServCopybot';
import {Trader} from '../datas/Trader';
import { TickersComponent } from './tickers/tickers.component';
import { Account } from '../datas/Account';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { TradesComponent } from './trades/trades.component';
import { Ticker } from '../datas/Ticker';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../Config';
import { LoginService } from '../../services/LoginService';
import { Router } from "@angular/router";

@Component({
  selector: 'cbot-trading',
  standalone: true,
  imports: [ TradesComponent, TickersComponent, DropdownModule,
    DividerModule ,ReactiveFormsModule, FormsModule
  ],
  templateUrl: './cbot-trading.component.html',
  styleUrl: './cbot-trading.component.scss'
})
export class CbotTradingComponent {

  @Input({ required:true }) accounts: Account[] | undefined;
  curAccount: Account | any;
  traders: Trader[] | any;
  tickers: Ticker[] = [];
  interval: any;


  constructor(private serv: ServCopybot, private http: HttpClient, private config: Config, private changeDetector: ChangeDetectorRef, private loginService: LoginService){
    afterNextRender(() => {
        this.initTimer();
    });
  }

  ngOnInit(){
    this.serv.loadTraders().subscribe(resp => {
      this.traders = resp;
    });
    console.log("ON INIT : load Accounts");
    console.log(this.accounts);
    if(this.accounts){
      this.curAccount = this.accounts[0];
    }
    this.refreshTickers();
  }

  showDialogCreateStrat(event:any){
    alert(event);
  }
    
  initTimer(){
    this.interval = setInterval(() => {
      this.refreshTickers(); 
    }, 500);
    /** 
    this.interval = setInterval(() => {
      this.checkTokenExpiration();
    }, 500);
    */
  }

  ngOnChanges(){
    console.log("Changes : "+ this.tickers);
  }
  
  refreshTickers(){
    let time = new Date();
    //if(time.getHours() > 4 && time.getHours()<24){
        this.http.get<Ticker[]>(this.config.getWsUrl() + "/trade/tickers").subscribe(data=>{
          this.tickers = data;
          this.changeDetector.detectChanges();
          //this.outTicks.emit(this.tickers);
      });
    //}
  }

  checkTokenExpiration(): void {
    if (this.loginService.isTokenExpired()) {
      console.log('Le token a expiré');
      this.loginService.refreshAccessToken();
     // this.router.navigate([''], { });

    }
  }
}
