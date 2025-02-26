import { Component, Input, input, Output } from '@angular/core';
import { ServCopybot } from '../../../services/ServCopybot';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Strategy } from '../../datas/Strategy';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

interface AutoCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'make-strategy',
  standalone: true,
  imports: [PanelModule, ReactiveFormsModule, InputTextareaModule,
      FormsModule, AutoCompleteModule, ButtonModule, FloatLabelModule,
      ToolbarModule, SplitButtonModule, InputTextModule, DropdownModule
    ],
  templateUrl: './make-strategy.component.html',
  styleUrl: './make-strategy.component.scss'
})
export class MakeStrategyComponent {

  @Output() makeStrategy = new Output();
  actifs: any[] = [];
  filteredActifs: any[] = [];
  canSaveStrategy: boolean = false;
  actif: any;
  what: any;
  ut: any;
  how:any;
  when: any;
  comment: any;
  unitTimes = [{id: 1, ut: "H1"}];
  whenTypes = [{ id: 1, libelle: "Zone de prix"}, { id: 2, libelle: "Combo"}, {id: 3, libelle:"Polarité"}];
  howTypes = [
    { id: 1, libelle: "Break Up"}, { id: 2, libelle: "Break Down"}
    ,{ id: 3, libelle: "BreakOut Up"}, { id: 4, libelle: "BreakOut Down"}
  ];
  frmMakeStrat = new FormGroup({
    what: new FormControl<string>("", Validators.required),
    when: new FormControl<string>("", Validators.required),
    how: new FormControl<string>("", Validators.required),
    comment: new FormControl<string>("", Validators.required),
    ut: new FormControl<string>("", Validators.required),

  });

  constructor(private service: ServCopybot){

  }
  ngOnInit(){
    this.actifs = this.service.loadActifs();
  }

  createStrategy(){
    if(this.frmMakeStrat.valid){
      let what = this.frmMakeStrat.get("what")?.value;
      let where = this.frmMakeStrat.get("where")?.value;
      let how = this.frmMakeStrat.get("how")?.value;
      let str : Strategy | never = new Strategy();
      str.id = Math.random() * 10;
      str.what = (what == undefined ? "": what);
      str.where = (where == undefined ? "": where);
      str.how = (how == undefined ? "": how);
      this.makeStrategy.emit('makeStrategy', str);
    }
  }


  filterActif(event: AutoCompleteEvent){
    let filtered: any[] = [];
    let query = event.query;
    for(let i = 0; i < this.actifs.length; i++){
      let a = this.actifs[i];
      if(a.code.toLowerCase().indexOf(query.toLocaleLowerCase()) != -1){
        filtered.push(a);
      }
    }
    this.filteredActifs = filtered;
  }

  checkStrategyForm(event:any){
    this.canSaveStrategy = this.frmMakeStrat.valid;

  }

}