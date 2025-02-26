
export class Account {
    id: number;
    libelle: string;
    capital: number;
    equity: number;
    expoPercent: number;
    objectif: number;
    closed: boolean;
    enabledCopy: boolean;
    enabledObjectif: boolean;
    master: boolean;
    
    constructor(id: number, libelle: string,capital: number,
        equity: number,
        expoPercent: number,
        objectif: number,
        closed: boolean,
        enabledCopy: boolean,
        enabledObjectif: boolean, 
        master: boolean){
        this.id = id;
        this.libelle = libelle;
        this.capital = capital;
        this.equity = equity;
        this.expoPercent = expoPercent;
        this.objectif = objectif;
        this.closed = closed;
        this.enabledCopy = enabledCopy;
        this.enabledObjectif = enabledObjectif;
        this.master = master;
    }

    public hello(){
        let msg : string = "Hello : "+ this.id;
        console.log(msg);
        return msg as string;
    }

    public showVars() { 
            let val = (" id: "+ this.id + ", libelle: "+ this.libelle + ", capital: "+ this.capital
        + ", equity: "+ this.equity + ",expoPercent: "+ this.expoPercent + ", objectif: "+ this.objectif
        + ", closed: "+ this.closed + ", enabledCopy: "+ this.enabledCopy + ", enabledObjectif: "+ this.enabledObjectif);
        return val as string;
    }
} 