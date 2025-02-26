import { Component, Input, Output } from '@angular/core';
import { TradeLines } from '../../datas/TradeLines';
import { EventEmitter } from 'stream';

@Component({
  selector: 'trade-lines',
  standalone: true,
  imports: [],
  templateUrl: './trade-lines.component.html',
  styleUrl: './trade-lines.component.scss'
})
export class TradeLinesComponent {


  @Input({required:true}) lines: TradeLines[] = [];
  constructor(){

  }

  ngOnInit(): void {
    console.log('Lines in component:', this.lines);
    if (this.lines.length > 0) {
      console.log('First line openPrice:', this.lines[0].open);
    }
  }


}
