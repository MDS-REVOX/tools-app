import { Component, Input } from '@angular/core';
import { Account } from '../../datas/Account';
import { ServCopybot } from '../../../services/ServCopybot';
import { CardModule } from 'primeng/card';
import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'cbot-follow-item',
  standalone: true,
  imports: [
      CardModule, InputSwitchModule, ReactiveFormsModule, FormsModule,
  ],
  templateUrl: './follow-item.component.html',
  styleUrl: './follow-item.component.scss'
})
export class FollowItemComponent {

  @Input({required: true}) acc: Account | any;
  copy: boolean = false;
  objectif: boolean = false;


  constructor(private serv: ServCopybot){

  }

  ngOnInit(){
    if(this.acc){
      this.copy = this.acc.enabledCopy;
      this.objectif = this.acc.enabledObjectif;
    }
  }
  ngOnChanges(){
  }
  toggleEnabled(){
    if(!this.acc){
      return;
    }
    this.acc.enabledCopy = this.copy;
    this.acc.enabledObjectif = this.objectif;
    this.serv.toggle(this.acc).subscribe(resp=>{
      console.log("Reponse :"+ resp);
      if(resp instanceof HttpResponse){
        if(resp.status === 200){
          console.log(resp.body);
        }
      }
    });
  }
}
