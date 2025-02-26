

export interface IMqlEvent {
    idAccount: number;
    idTradeLine: number;
    eventType: number;
    side: number;
    ticket: number;
    symbol: string;
    price: number;
    size: number;
    stopLoss: number;
    takeProfit: number;
  }
  
  export class MqlEvent implements IMqlEvent {
    idAccount: number = 0;
    idTradeLine: number = 0;
    eventType: number = 0;
    side: number = 0;
    ticket: number = 0;
    symbol: string = '';
    price: number = 0.0;
    size: number = 0.0;
    stopLoss: number = 0.0;
    takeProfit: number = 0.0;
  
    constructor(data?: Partial<IMqlEvent>) {
      if (data) {
        this.idAccount = data.idAccount ?? this.idAccount;
        this.idTradeLine = data.idTradeLine ?? this.idTradeLine;
        this.eventType = data.eventType ?? this.eventType;
        this.side = data.side ?? this.side;
        this.ticket = data.ticket ?? this.ticket;
        this.symbol = data.symbol ?? this.symbol;
        this.price = data.price ?? this.price;
        this.size = data.size ?? this.size;
        this.stopLoss = data.stopLoss ?? this.stopLoss;
        this.takeProfit = data.takeProfit ?? this.takeProfit;
      }
    }
  }
  