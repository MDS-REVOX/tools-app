

interface ITradeLines{
    id: number;
    idTrade: number;
    idTicket: number;
    followup: number;
    idTradeFollow:number;
    side:number;
    symbol:string;
    exposition:number;
    open: number;
    close:number;
    breakEvent:boolean;
    stopLoss:boolean;
    takeProfit:boolean;
    gainLoss:number;
    glTicks:number;
    priceTp:number;
    priceSl:number;
}

export class TradeLines implements ITradeLines{
    id: number = 0;
    idTrade: number = 0;
    idTicket: number = 0;
    followup: number = 0;
    idTradeFollow: number = 0;
    side: number = 0;
    symbol: string = "";
    exposition: number = 0;
    open: number = 0;
    close: number = 0;
    size: number = 0;
    breakEvent: boolean = false;
    stopLoss: boolean = false;
    takeProfit: boolean = false;
    gainLoss: number = 0;
    glTicks: number = 0;
    priceTp: number = 0;
    priceSl: number = 0;

    constructor(){

    }

}