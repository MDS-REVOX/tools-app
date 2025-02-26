import { Account } from "./Account";

export class Trader extends Account{

    followers: Account[];
    constructor(id: number, libelle: string,capital: number,
        equity: number, expoPercent: number,
        objectif: number, closed: boolean,
        enabledCopy: boolean, enabledObjectif: boolean, 
        master: boolean, followers: Account[])
    {
        super(id, libelle, capital, equity, expoPercent, objectif, closed, enabledCopy, enabledObjectif, master);
        this.followers = followers;
    }
}