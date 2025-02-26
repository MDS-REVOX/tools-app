import { Component, Input, Output } from '@angular/core';
import { Account } from '../../datas/Account';
import { ServCopybot } from '../../../services/ServCopybot';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'form-account',
  standalone: true,
  imports: [
    ReactiveFormsModule, FormsModule, ButtonModule,
    DividerModule, InputSwitchModule, InputNumberModule,
    MessagesModule, ToastModule
  ],
  templateUrl: './form-account.component.html',
  styleUrl: './form-account.component.scss'
})
export class FormAccountComponent {

  @Input({required: true}) acc: Account | any;
  //@Output("saved") saved = new EventEmitter<any>();
  hasChange: boolean = false;
  initialValue : any;
  accountForm = new FormGroup(
    {    
      id: new FormControl<Number>(0, Validators.required),
      libelle: new FormControl<string>(''),
      capital: new FormControl<Number>(0, Validators.required),
      equity: new FormControl<Number>(0),
      expoPercent: new FormControl<Number>(0, Validators.required),
      objectif: new FormControl<Number>(0),
      closed: new FormControl<Boolean>(false),
      enabledCopy: new FormControl<Boolean>(false, Validators.required),
      enabledObjectif: new FormControl<Boolean>(false, Validators.required)
    }
  );

  constructor(private serv: ServCopybot, private messageService: MessageService)
  {

  }
  ngOnInit(){
    console.log(this.acc);
    this.selectAccount();
  }

  ngOnChanges(){ 
    this.selectAccount();
  }

  selectAccount(){
    if(!this.acc){
      this.accountForm.setValue(
        {    
          id: 0,
          libelle: "",
          capital: 0,
          equity: 0,
          expoPercent: 0,
          objectif: 0,
          closed: false,
          enabledCopy: false,
          enabledObjectif: false
        });
        this.acc = null;
      return;
    }
    this.accountForm.setValue({
      id: this.acc.id,
      libelle: this.acc.libelle,
      capital: this.acc.capital,
      equity: this.acc.equity,
      expoPercent: this.acc.expoPercent,
      objectif: this.acc.objectif,
      closed: this.acc.closed,
      enabledCopy: this.acc.enabledCopy,
      enabledObjectif: this.acc.enabledObjectif
    });
  }
  saveAccount(){
    if(this.accountForm.invalid || !this.acc){
      console.log(" INVALID FORM !!");
      return;
    }
    
    this.loadFormValues();
    this.serv.saveAccount(this.acc).subscribe(sub=>{
      console.log(sub);
      if(sub instanceof HttpResponse){
        if(sub.status === 200){
          this.showMessages(sub.body);
        }else{
          this.showMessages(false);
        }
      }else {
        if(sub ===true){
          this.showMessages(true);       
        }else{
          this.showMessages(false); 
        }
      }
    });
  }

  loadFormValues(){
    this.acc.id = this.accountForm.get("id")?.value;
    this.acc.libelle = this.accountForm.get("libelle")?.value;
    this.acc.capital = this.accountForm.get("capital")?.value;
    this.acc.equity = this.accountForm.get("equity")?.value;
    this.acc.expoPercent = this.accountForm.get("expoPercent")?.value;
    this.acc.closed = this.accountForm.get("closed")?.value;
    this.acc.enabledCopy = this.accountForm.get("enabledCopy")?.value;
    this.acc.enabledObjectif = this.accountForm.get("enabledObjectif")?.value;
  }
  showMessages(success:boolean){
    let msg = success ? "Sauvegarde effectué" : "Echec de la sauvegarde";
    let severity = (success ? 'success' : 'warn')
    this.messageService.add({severity: severity, summary: msg, detail:"", life: 2500, closable: false});
    setInterval(() => {
    //  this.saved.emit({saved: success});
    }, 2500);
  }
}
