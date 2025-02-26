import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Ticker } from '../../datas/Ticker';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { TradeService } from '../../../services/TradeService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ticker-item',
  standalone: true,
  imports: [ButtonModule, InputNumberModule, FormsModule, CommonModule],
  templateUrl: './ticker-item.component.html',
  styleUrl: './ticker-item.component.scss'
})
export class TickerItemComponent implements OnChanges{

  @Input({required: true})  ticker: Ticker | any;
  @Input({required: true})  accountId: number = 0;
  lotSize:number = 0.17;
  green = "#22c55e";
  greenDark = "#1da750";
  primary500 = this.green;
  primary600 = this.greenDark;
  disabled = this.accountId = 0;
  classes: string= "#2dd4bf";
  buy = 1;
  sell = 2;

  isMarketOpen: boolean = true;

  constructor(private tradeServ:TradeService){

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.lotSize != 0.17){
      console.log(this.lotSize);
    }
    if (changes["ticker"] && changes["ticker"].currentValue !== undefined) {
      let cur = changes["ticker"].currentValue;
      //console.log(this.classes + ": "+ this.classes.includes(this.primary500));
      if(cur !== this.ticker){
        if(this.classes.includes(this.primary500)){
          this.classes = this.primary600;
        }else{
          this.classes = this.primary500;
        }
        this.classes += " !important";
      }
    }
  }

  ngOnInit(){

  }

  fastTradeClick(Side:string){
    this.tradeServ.openTrade(this.accountId, this.ticker.symbol, Side === 'buy' ? 1 : 2, this.lotSize);
    // console.log("AccountId: "+ this.accountId +"  "+ Side + " "+ this.ticker.symbol + " "+ (Side === 'buy'? this.ticker.ask : this.ticker.bid));
  }

}
