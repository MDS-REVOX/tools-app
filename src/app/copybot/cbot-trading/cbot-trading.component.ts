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
import { NotificationPopupComponent } from './trade-notification/notification-popup.component';
import { MqlNotification } from '../datas/MqlNotification';
import { TradeService } from '../../services/TradeService';

@Component({
  selector: 'cbot-trading',
  standalone: true,
  imports: [ TradesComponent, TickersComponent, DropdownModule,
    DividerModule ,ReactiveFormsModule, FormsModule, NotificationPopupComponent
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
  notificationInterval: any;

  showNotification = false;
  message = 'Ceci est une notification!';


  constructor(private serv: ServCopybot, private http: HttpClient, private config: Config, private changeDetector: ChangeDetectorRef, private loginService: LoginService
    ,private tradeServ:TradeService
  ){
    afterNextRender(() => {
        this.initTimer();
    });
  }

  ngOnInit(){
    this.serv.loadTraders().subscribe(resp => {
      this.traders = resp;
    });
    if (this.accounts && this.accounts.length > 0) {
      console.log("ON INIT : load Accounts");
      console.log(this.accounts);
      if(this.accounts){
        this.curAccount = this.accounts[0];
      }
    }
    //this.refreshTickers();
  }

  showDialogCreateStrat(event:any){
    alert(event);
  }
    
  initTimer(){
    this.interval = setInterval(() => {
      this.refreshTickers(); 
    }, 500);

    this.notificationInterval = setInterval(() => {
      if (!this.showNotification) {  // N'affiche la notification que si aucune n'est déjà en cours
        console.log('Tentative d\'affichage de la notification');
        this.showPopup();
      }
    }, 5000); 

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

  // Afficher la notification après 2 secondes
  showPopup() {
    console.log('Avant mise à jour: ', this.showNotification, this.message);
    this.showNotification = false;
    this.getActiveNotif(this.curAccount.id);



    // this.changeDetector.detectChanges();
    setTimeout(() => {
      this.showNotification = false;
      // this.changeDetector.detectChanges();
    }, 5000); // La notification disparait après 3 secondes
    console.log('Après mise à jour: ', this.showNotification, this.message);
  }

  // Fermer la notification via le composant enfant
  closePopup() {
    console.log('Popup fermée');
    this.showNotification = false;  // Fermer la notification lorsqu'on clique sur la croix

    // Réinitialiser l'intervalle de notification après la fermeture de la popup
    setTimeout(() => {
      console.log('Réouverture de la popup après la fermeture');
      this.showNotification = true;  // Forcer la réouverture de la notification après 5 secondes
    }, 5000);  // Réafficher la notification après 5 secondes
  }

  getActiveNotif(accountId: number) {
    this.tradeServ.getMqlNotification(accountId).subscribe({
      next: (value: MqlNotification[]) => {
        if (value && value.length > 0) {
          // Formater le message avec les notifications reçues
          this.message = value
            .map((notification) => `Event Type: ${notification.eventType}, Symbol: ${notification.symbol}`)
            .join('\n');  
          this.showNotification = true;
          this.playNotificationSound();
        } else {
          this.message = 'Aucune notification disponible';
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des notifications :', err);
        this.message = 'Erreur lors de la récupération des notifications'; 
        this.showNotification = false;  
      },
      complete: () => {
        console.log('Requête terminée, succès ou échec');
      }
    });
  }

  // Fonction pour jouer le son de notification
  playNotificationSound() {
    const audio = new Audio();
    //audio.src = '../assets/sounds/notification.mp3'; 
    audio.src = '../assets/sounds/notification.mp3'; 
    audio.load();
    audio.play().catch((error) => {
      console.error('Erreur de lecture audio:', error);
    });
  }
}
