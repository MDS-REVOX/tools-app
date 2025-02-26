import { Component, Input } from '@angular/core';
import { Account } from '../datas/Account';
import { ServCopybot } from '../../services/ServCopybot';
import { ChipModule } from 'primeng/chip';

import { ButtonModule } from 'primeng/button';
import { FollowItemComponent } from './follow-item/follow-item.component';
import { ScrollerModule } from 'primeng/scroller';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Config } from '../../Config';


@Component({
  selector: 'cbot-following',
  standalone: true,
  imports: [ChipModule, ButtonModule, FollowItemComponent, ScrollerModule],
  templateUrl: './cbot-following.component.html',
  styleUrl: './cbot-following.component.scss'
})
export class CbotfollowingComponent {

  @Input({required: true}) selected: Account | any;
  lastSelected : Account | any;
  accounts: Array<Account> = new Array<Account>();

  constructor(private serv: ServCopybot, private http: HttpClient){

  }
  ngOnInit(){
    console.log(this.selected);
    if(this.selected){
      this.lastSelected = this.selected;
      this.loadDatas();
    }
  }

  ngOnChanges(){
    console.log("CHANGES");
    if(this.selected == null){    
      this.lastSelected = this.selected;
      this.clearList(this.accounts);
      this.loadDatas();
    }else if(this.selected != this.lastSelected){   
      this.lastSelected = this.selected;
      this.loadDatas();
    }
  }

  clearList(list:Array<any>){
    if(list.length != 0){
      list.splice(0, list.length);
    }
  }

  loadDatas(){
    this.clearList(this.accounts);
    if(this.selected){
      if(this.selected.master){
        //let obs = this.http.get("http://api.mdossantos.fr/copy-bot/followers?masterId="+this.selected.id);
        let obs = this.serv.loadFollowers(this.selected.id).subscribe(resp => {
          this.accounts = resp;
        });
      }else if(!this.selected.master){
        this.serv.loadTradersByFollower(this.selected.id).subscribe(resp => {
          console.log(resp);
          this.accounts = resp
        });
      }
      // this.serv.loadSlaves(this.selected.id, this.selected.master).subscribe(resp=>{
      //   if(resp){
      //     resp.forEach(item=>{
      //       this.followings.push(item);
      //     });
      //   }
      // });
    }
  }

  getState(ms: Account):string{
    console.log("Get State calling");
    let res = "Innactif";
    if(ms.closed){
      res = "Clôturer";
    }else if(ms.enabledCopy){
      res =  "Copie actif ";
    }
    return res;
  }
  

  switchEvent(selected: Account){
  }

  formSubmit(event:any){
    console.log("Submit FROM ==>")
    console.log(event);
  }
}
