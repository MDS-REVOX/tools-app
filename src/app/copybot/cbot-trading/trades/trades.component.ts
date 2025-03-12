import { Component, Input } from '@angular/core';
import { Account } from '../../datas/Account';
import { TradeService } from '../../../services/TradeService';
import { Trade } from '../../datas/Trade';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { TradeLines } from '../../datas/TradeLines';
import { EventEnum } from '../../datas/EventEnum';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ticker } from '../../datas/Ticker';

@Component({
  selector: 'trades',
  standalone: true,
  imports: [DividerModule, ToastModule,  FormsModule, CommonModule
  ],
  templateUrl: './trades.component.html',
  styleUrl: './trades.component.scss'
})
export class TradesComponent {

  @Input({required:true}) account :Account = Account.prototype;
  @Input() tickers: Ticker[] | any;
  @Input() isTradePartiel: boolean = false;
  trades:Trade[]= [];

  public EventEnum = EventEnum;
  public isPartialTrade : boolean  = true;
  isFieldsetVisibleMap: { [key: number]: boolean } = {};
  inputVolume: number = 0;

  constructor(private tradeServ: TradeService){

  }

  ngOnChanges(){
  if(this.account){
      this.tradeServ.getTrades(this.account.id).subscribe(res=>{
        if(res !== undefined){
          this.trades = res;
        }
      });  
    }
  }
  loadTrades(){
    if(this.account){
      this.tradeServ.getTrades(this.account.id).subscribe(res=>{
        this.trades = res;
      });  
    }
  }
  onLineTpBlur(line : TradeLines){
    if(!line){
      console.log("UNDEFINED");
      return;
    }
    console.log(line);
  }
  expandAll(){

  }
  collapseAll(){

  }

  avgOpenPrices(lines: TradeLines[]){
    if(!lines){
      return 0;
    }    
    let price = 0;
    let count = 0;
    lines.forEach(line => {
      price += line.open;
      count +=1;
    });
    let avg = (price / count);
    let ticker = this.getTicker(lines[0].symbol);
    console.log(ticker);
    avg = Math.round(avg*100000.0)/100000.0;  
    return avg;
  }


  makeBreakEvent(trade:Trade, event:EventEnum) {
    if (!this.isPartialTrade){
      this.tradeServ.makeEventTrade(this.account.id, trade, event);
    } else {
      this.tradeServ.makeEventTradePartial(this.account.id, trade, event, this.inputVolume);
    }
  }

  makeCloseTrade(trade:Trade, event:EventEnum) {
    if (!this.isPartialTrade){
      this.tradeServ.makeEventTrade(this.account.id, trade, event);
    } else {
      this.tradeServ.makeEventTradePartial(this.account.id, trade, event, this.inputVolume);
    }  
  }

  toggleFieldset(trade:Trade) {
    const tradeId = trade.id;
    // Inverser la visibilité actuelle du fieldset pour ce trade
    this.isFieldsetVisibleMap[tradeId] = !this.isFieldsetVisibleMap[tradeId];
    
  }


  makeTp1Trade(trade:Trade, event:EventEnum) {
    this.tradeServ.makeEventTrade(this.account.id, trade, event);    
  }


  getProfit(trade:Trade, percent:boolean){
    let profit:number = 0;
    for(let i = 0; i < trade.lines.length; i++){
      profit += trade.lines[i].gainLoss;
    }
    if(percent){
      profit = 0.25;
    }
    return profit;
  }

  // Filtre les lignes qui n'ont pas de takeProfit et stoploss
  getNbTradeLine(trade: Trade): number {
    if (!trade.lines || trade.lines.length == 0) {
      return 0;
    }
    return trade.lines.filter(line => line.takeProfit == false && line.stopLoss == false).length;
  }

  getNbTradeBE(trade: Trade): number {
    if (!trade.lines || trade.lines.length == 0) {
      return 0;
    }

    return trade.lines.filter(line => line.breakEvent == true).length;
  }
  getOpenLotSize(trade: Trade){
    let lotSize :number = 0;
    if(!trade){
      return lotSize;
    }
    
    trade.lines.forEach(line => {
      lotSize += line.exposition;
      if(line.volumeClose !== undefined){
        lotSize -= line.volumeClose;
      }
    });
    return lotSize;
  }
  isTradeActifBE(trade: Trade): boolean {
    if (!trade.lines || trade.lines.length == 0) {
      return false;
    }
    let nb = trade.lines.filter(line => line.breakEvent == true).length;
    if (nb != 0) {
      return false;
    }
    return true;
  }

  isTradeActifClose(trade: Trade): boolean {
    if (!trade.lines || trade.lines.length == 0) {
      return false;
    }
    let nb = trade.lines.filter(line => line.breakEvent == true).length;
    if (nb != 0) {
      return false;
    }
    return true;
  }

  // Filtre les lignes qui ont takeProfit et stopLoss 
  getNbTradeLineClose(trade: Trade): number {
    if (!trade.lines || trade.lines.length == 0) {
      return 0;
    }
    return trade.lines.filter(line => line.takeProfit == true || line.stopLoss == true).length;
  }

  getNbTradeLineClosePartial(trade: Trade): number {
    if (trade.lines[0].volumeClose == null  || trade.lines[0].volumeClose == 0) {
      return 0;
    } else {
      if (trade.lines[0].volumeClose >= trade.lines[0].exposition / 2 ) {
        return 2;
      }else {
        return 1;
      }
    }
  }

  
  isTradeLigneClose(line: TradeLines): boolean {
    if (line.takeProfit == true || line.stopLoss == true) {
      return true;
    }
    return false;
  }

  getTradeWinOrLoss(line: TradeLines): number {
    if (line.takeProfit == true ) {
      return  0;
    } else if (line.stopLoss == true) {
      return  1;
    }
    return -1;
  }
  

  isTradeBE(line: TradeLines): boolean {
    if (line.breakEvent == true) {
      return true;
    }
    return false;
  }

  // Action TP sur la ligne trade
  lineItemMajClick(line: TradeLines, event:EventEnum,): void {
    console.info('On mets a jour le tp et sl:', line.id);   
    this.tradeServ.makeEventTradeLine(this.account.id, line, event);
    //console.log("AccountId: "+ this.accountId +"  "+ Side + " "+ this.ticker.symbol + " "+ (Side === 'buy'? this.ticker.ask : this.ticker.bid));
  }

  // Action CLOSE TRADE sur la ligne trade
  lineItemCloseTradeClick(line: TradeLines, event:EventEnum): void {
    console.info('On ferme le trade :', line.id);  
    this.tradeServ.makeEventTradeLine(this.account.id, line, event);
  }

  // Action Valid tp sur la ligne trade
  lineItemTPClick(line: TradeLines, event:EventEnum): void {
    this.tradeServ.makeEventTradeLine(this.account.id, line, event);
  }

  onTradeTPBlur(line: TradeLines): void {
    if (line.priceTp == 0) {
      //line.priceTp = line.price;
    }
  }

  onRowExpand(event: any){
    console.log(event);
  }

  onRowCollapse(event: any){
    console.log(event);
  }

  collaspeOrExpand(event: any) {
    let cssCollaspe = 'collapsable';
    let cssExpand = 'expandable';
    let collapsed = event.target.classList.contains(cssCollaspe);
    let component = event.target;
    //console.log(event.target.parentElement);
    let childrens = event.target.parentElement.children;
    if (collapsed) {
      component.classList.remove(cssCollaspe);
      component.classList.add(cssExpand);
      childrens[1].classList.remove('collapsed');
      childrens[1].classList.add('expanded');
    } else {
      component.classList.remove(cssExpand);
      component.classList.add(cssCollaspe);
      childrens[1].classList.remove('expanded');
      childrens[1].classList.add('collapsed');
    }
}
    calcPnl(trade: Trade){
      return this.calculPnl(trade, false);
    }
    calcPnlPercent(trade: Trade){
      return this.calculPnl(trade, true);
    }
    calculPnl(trade: Trade, percent : boolean){
      let open : number = 0;
      let size : number = 0;
      let ticker = this.getTicker(trade.symbol);
      let close : number = 0;
      let countActifs : number = 0;
      
      if(ticker != undefined){
        close = trade.side == 1 ? ticker.ask : ticker.bid;
      }
      trade.lines.forEach(line=>{
        if(line.open !=  0){
          open += line.open;
          size += line.exposition;
          if(line.volumeClose !== undefined){
            size -= line.volumeClose;
          }
          let ticks = (close - line.open);
          // console.log(ticks);
          let pnl = size * ticks;
          console.log(pnl);
          countActifs++;
        }
      });
      let avg = (open / countActifs);
      let ticks = close - avg ;
      if(trade.side != 1){
        ticks = avg  - close ;
      }
      let pnl = ticks * size;
      if(percent){
        pnl = (close - avg) / avg;
      }
      // console.log(pnl);
      return Math.round(pnl * 1000.00) / 1000.00;
    }
getTicker(Symbol: string){
  if(!this.tickers){
    return undefined;
  }
  let target = this.tickers.find((value:Ticker)=>  value.symbol ===Symbol);
  return target;
}

  
}
