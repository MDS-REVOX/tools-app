
export class Ticker
{
    id: number = 0;
    symbol:string = "";
    ask: number = 0;
    bid: number = 0;
    marketOpen: boolean | null;

    constructor(Id: number, Symbol: string, Ask: number, Bid:number, MarketOpen:boolean){
        this.id = Id;
        this.symbol = Symbol;
        this.ask = Ask;
        this.bid = Bid;
        this.marketOpen = MarketOpen;
    }
}