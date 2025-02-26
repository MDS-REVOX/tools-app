import { Component, Input, ViewChild } from '@angular/core';
import { Account } from '../datas/Account';
import { ServCopybot } from '../../services/ServCopybot';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { AccordionModule } from 'primeng/accordion';
import { CbotfollowingComponent } from '../cbot-following/cbot-following.component';
import { FormAccountComponent } from './form-account/form-account.component';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'cbot-accounts',
  standalone: true,
  imports: [DropdownModule, ButtonModule, TooltipModule,
      DividerModule, FloatLabelModule, CardModule,
       InputSwitchModule, InputNumberModule,
       ReactiveFormsModule, FormsModule, 
      CbotfollowingComponent, AccordionModule, FormAccountComponent
    ],
  templateUrl: './cbot-account.component.html',
  styleUrl: './cbot-account.component.scss'
})
export class CbotAccountComponent {

  @Input({required: true}) accounts: Account[] | undefined;
  curAccount:  Account | any;
  constructor(private service: ServCopybot){

  }
  ngOnInit(){
    console.log("ON INIT : load Accounts");
    console.log(this.accounts);
    if(this.accounts){
      this.curAccount = this.accounts[0];
    }
  }

}
