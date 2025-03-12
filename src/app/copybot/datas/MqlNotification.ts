

export interface IMqlNotification {
  id: number;
  idAccount: number;
  idTradeLine: number;
  eventType: number;
  side: number;
  symbol: string;
  lotSize: number;

}

export class MqlNotification implements IMqlNotification {
  id: number = 0;
  idAccount: number = 0;
  idTradeLine: number = 0;
  eventType: number = 0;
  side: number = 0;
  symbol: string = '';
  lotSize: number = 0.0;

  constructor(data?: Partial<IMqlNotification>) {
    if (data) {
      this.id = data.id ?? this.id;
      this.idAccount = data.idAccount ?? this.idAccount;
      this.idTradeLine = data.idTradeLine ?? this.idTradeLine;
      this.eventType = data.eventType ?? this.eventType;
      this.side = data.side ?? this.side;
      this.symbol = data.symbol ?? this.symbol;
      this.lotSize = data.lotSize ?? this.lotSize;
    }
  }
}
