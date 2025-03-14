export enum EventEnum {
    TRADE_OPEN = 0,
    TRADE_CLOSE = 1,
    TRADE_MAJ = 2,
    BREAK_EVENT = 3,
    KILL_ALL = 4,
    TRADE_TP = 5,
    EVENT_OP_END = 6, // L'événement pour anomalie
    EVENT_MARKET_CLOSE = 7 // Marché fermé

  }

  export function getEventTypeText(eventType: EventEnum): string {
    switch (eventType) {
      case EventEnum.TRADE_OPEN:
        return 'Ouverture de Trade';
      case EventEnum.TRADE_CLOSE:
        return 'Fermeture de Trade';
      case EventEnum.TRADE_MAJ:
        return 'Mise à jour de Trade';
      case EventEnum.BREAK_EVENT:
        return 'Événement de rupture';
      case EventEnum.KILL_ALL:
        return 'Killer tous les trades';
      case EventEnum.TRADE_TP:
        return 'Take Profit atteint';
      case EventEnum.EVENT_OP_END:
        return 'Anomalie';
      case EventEnum.EVENT_MARKET_CLOSE:
        return 'Marché fermé';
      default:
        return 'Type d\'événement inconnu';
    }
  }
  