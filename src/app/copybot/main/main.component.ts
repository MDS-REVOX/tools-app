import { Component } from '@angular/core';
import { ServCopybot } from '../../services/ServCopybot';
import { Account } from '../datas/Account';
import {ScrollerModule} from 'primeng/scroller';
import { OrderListModule } from 'primeng/orderlist';
import { DragDropModule } from 'primeng/dragdrop';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopup, ConfirmPopupModule } from 'primeng/confirmpopup';
import { CbotAccountComponent } from '../cbot-account/cbot-account.component';
import { CbotTradingComponent } from '../cbot-trading/cbot-trading.component';
import { LoginService } from '../../services/LoginService';

@Component({
  selector: 'cbot-main',
  standalone: true,
  imports: [ScrollerModule,  OrderListModule, DragDropModule, ButtonModule,
    PanelModule, ToolbarModule, TooltipModule, ConfirmPopupModule, ToastModule, TabViewModule, BadgeModule, AvatarModule,
    CbotAccountComponent, CbotTradingComponent ],
  providers: [ ConfirmPopup, ConfirmationService, MessageService],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})

export class CBotMainComponent {
  loading: boolean = false;
  accounts: Account[] | undefined;
  actifAccount: Account[] | undefined;
  masters:  Account[] | undefined;
  constructor(private service: ServCopybot, private confirmationService: ConfirmationService, private messageService: MessageService, private loginService: LoginService){

  }
  ngOnInit(){
    console.log("ON INIT : load Accounts");
    this.processDatas();
  }

  processDatas(){
    this.loading = true;
    this.getAccounts();
  }
  getAccounts(){
    this.service.allAccounts().subscribe(contents=>{
      this.accounts = contents;
      this.actifAccount = this.accounts.filter(acc=> acc.closed==false);
     this.masters = this.getMasterAccounts();
      console.log("Contents was received : "+ contents);
      console.log("Accounts array : "+ this.accounts);
    });
  }
  getMasterAccounts(){
    if(this.accounts != undefined){
      let masters = new Array<Account>;
      this.accounts.forEach((acc, index)=>{
        if(acc.master){
          masters.push(acc);
        }
      });
      return masters;
    }
    return undefined;
  }
  killCopyBot(){
    let kill:boolean = confirm("Êtes-vous sur de vouloir forcer l'arrêt brutale de copy Bot ? ");
    // this.confirmationService.
    if(kill) {
      this.service.killCopyBot().subscribe(resp =>{ 
        if(resp){
          alert("Arrêt forcé du bot de copie trading effectué !");
        }else{
          console.log("0 action");
        }
      }
      , error => alert(error));
    }
  }
  logout(){
    this.loginService.logout();
  }
  confirm(event:any){
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: "Forcer l'arrêt brutale du Copy-Traing ? "
    });
  }
  accept() {
    this.service.killCopyBot().subscribe(resp =>{ 
      if(resp){
        this.messageService.add({ severity: 'success', summary: 'Arrêt du bot', detail: 'Réussi !', life: 3000 });
      }else{
        console.log("0 action");
        this.messageService.add({ severity: 'warning', summary: 'Arrêt du bot', detail: "Echec de l'arrêt forcé."+ resp, life: 3000 });
      }
    }, error=>{
        this.messageService.add({ severity: 'error', summary: '[ERREUR]', detail: "Une erreur est survenue : "+ error, life: 3000 });
    });
}
reject() {
    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
}

}
