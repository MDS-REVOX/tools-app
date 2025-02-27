import { HttpClient } from "@angular/common/http";
import { Config } from "../Config";
import { Observable } from "rxjs";
import { Trade } from "../copybot/datas/Trade";
import { Injectable } from "@angular/core";
import { response } from "express";
import { TradeLines } from "../copybot/datas/TradeLines";
import { MqlEvent } from "../copybot/datas/MqlEvent";
import { EventEnum } from "../copybot/datas/EventEnum";
import { Divider } from "primeng/divider";

@Injectable({providedIn: 'root'})
export class TradeService{
    private url : string = "";
    constructor(private http:HttpClient, private config: Config){
        this.url = config.getWsUrl()+"/trade";
    }



    getTrades(Accountid: number) : Observable<Array<Trade>>{
        return this.http.get<Array<Trade>>(this.url+"/list", {params:{
            accountId: Accountid
        }});
    }


    openTrade(accountId: number, symbol:string, side: number, exposition: number, divider:boolean){
        this.http.post(this.url+"/open", {"accountId":accountId, "symbol":symbol, "side":side, "exposition":exposition, "divider":divider}, {observe: "response"}).subscribe(res=>{
            console.log(res);
        });
    }


    makeEventTradeLine(accountId: number, line: TradeLines, event:EventEnum){
        const mqlEvent: MqlEvent = new MqlEvent({
            idAccount: accountId, 
            idTradeLine: line.id,
            eventType: event, 
            side: line.side,
            ticket: line.idTicket,
            symbol: line.symbol,
            price: line.open, 
            size: line.exposition,
            stopLoss: line.priceSl,
            takeProfit: line.priceTp,
        });

        this.http.post(this.url+"/make-event",mqlEvent,{observe: "response"}).subscribe(res=>{
            console.log(res);
        })

        

    }

    makeEventTrade(accountId: number, trade: Trade, event:EventEnum){
        //Si event de maj on doit checker lequel a le prix le plus bas
        let minPrice = -Infinity;
        let maxPrice = Infinity;
        let idLine = 0;
        let selectedLine: TradeLines | undefined;

        if (event == EventEnum.TRADE_MAJ ) {
            //if (event == EventEnum.TRADE_MAJ || event == EventEnum.TRADE_CLOSE) {
            trade.lines.forEach((line) => {
                if (trade.side == 1) {
                    if (minPrice < line.open ) {
                        minPrice = line.open;
                        idLine = line.idTrade;
                        selectedLine = line;
                    }
                } else {
                    if (maxPrice > line.open) {
                        maxPrice = line.open;
                        idLine = line.idTrade;
                        selectedLine = line;
                    }
                }
            });
            if (selectedLine != undefined) {
                const mqlEvent: MqlEvent = new MqlEvent({
                    idAccount: accountId, 
                    idTradeLine: trade.id,
                    eventType: event, 
                    side: trade.side,
                    ticket: selectedLine.idTicket,
                    symbol: trade.symbol,
                    price: selectedLine.open, 
                    size: trade.exposition,
                    stopLoss: selectedLine.priceSl,
                    takeProfit: selectedLine.priceTp,
                });
                console.log(selectedLine);
                
                this.http.post(this.url+"/make-event",mqlEvent,{observe: "response"}).subscribe(res=>{
                    console.log(res);
                })
                    
            }
        } else {

            trade.lines.forEach((line) => {
                const mqlEvent: MqlEvent = new MqlEvent({
                    idAccount: accountId, 
                    idTradeLine: trade.id,
                    eventType: event, 
                    side: trade.side,
                    ticket: line.idTicket,
                    symbol: trade.symbol,
                    price: line.open, 
                    size: trade.exposition,
                    stopLoss: line.priceSl,
                    takeProfit: line.priceTp,
                });
                
                this.http.post(this.url+"/make-event",mqlEvent,{observe: "response"}).subscribe(res=>{
                    console.log(res);
                })
            });
        }


    }

    makeEventTradePartial(accountId: number, trade: Trade, event:EventEnum, vol: number){
        if (vol == 0) {
            vol = trade.exposition;
        }
        if (event != EventEnum.TRADE_CLOSE ) {
            vol = trade.exposition;
        }
        const mqlEvent: MqlEvent = new MqlEvent({
            idAccount: accountId, 
            idTradeLine: trade.id,
            eventType: event, 
            side: trade.side,
            ticket: trade.lines[0].idTicket,
            symbol: trade.symbol,
            price: trade.lines[0].open, 
            //size: trade.exposition,
            size: vol,
            stopLoss: trade.lines[0].priceSl,
            takeProfit: trade.lines[0].priceTp,
        });
            
        this.http.post(this.url+"/make-event",mqlEvent,{observe: "response"}).subscribe(res=>{
            console.log(res);
        })
        
    }


    
}



