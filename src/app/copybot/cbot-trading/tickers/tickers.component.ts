import { afterNextRender, ChangeDetectorRef, Component, Input, OnChanges, Output, SimpleChange, ViewChild } from '@angular/core';
import { Ticker } from '../../datas/Ticker';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../../Config';
import { TickerItemComponent } from '../ticker-item/ticker-item.component';
import { Account } from '../../datas/Account';
import { EventEmitter } from 'stream';

@Component({
  selector: 'tickers',
  standalone: true,
  imports: [TickerItemComponent],
  templateUrl: './tickers.component.html',
  styleUrl: './tickers.component.scss'
})
export class TickersComponent implements OnChanges{

  @Input() account:Account | any;
  @Input() tickers: Ticker[] = []; 
  // @Output() outTicks: EventEmitter = new EventEmitter();
  // tickers: Ticker[] = [];
  interval: any;
  

  constructor(private http: HttpClient, private config: Config){
    
  }
  ngOnInit(){
    //this.refreshTickers();
  }

  initTimer(){
    this.interval = setInterval(() => {
      this.refreshTickers(); 
    }, 1000);
  }

  ngOnChanges(){
    // console.log("Changes : "+ this.tickers);
  }

  refreshTickers(){
    let time = new Date();
    //if(time.getHours() > 4 && time.getHours()<24){
        this.http.get<Ticker[]>(this.config.getWsUrl() + "/trade/tickers").subscribe(data=>{
          if(data !== undefined){
            this.tickers = data;
          }
          //this.changeDetector.detectChanges();
          //this.outTicks.emit(this.tickers);
      });
    //}
  }


}

