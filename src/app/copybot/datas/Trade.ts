import { TradeLines } from "./TradeLines";


interface ITrade {
    id: number;
    idAccount:number;
    side:number;
    symbol:string;
    exposition:number;
    divider:number;
    followable:boolean;
    lines:Array<TradeLines>;
    stopLoss: number;
    inProgress: number;

}

export class Trade implements ITrade{
    public id: number=0;
    public idAccount: number = 0;
    public symbol: string = "";
    public exposition: number = 0;
    public divider: number = 0;
    public followable: boolean = true;
    public lines: TradeLines[] = [];
    public side: number = 0;
    public stopLoss: number = 0;
    public inProgress: number = 0;
    constructor(){

    }
}