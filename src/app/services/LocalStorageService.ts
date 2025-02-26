import { Injectable, KeyValueDiffers } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LocalService {

    private store: Map<string, string> = new Map<string, string>();
    constructor(){

    }

    public saveData(key: string, value: string):boolean {
        this.store.set(key, value);
        return this.store.has(key);
    }

    public getData(key: string): string | undefined{
        if(!this.store.has(key)){
            return undefined;
        }
        return this.store.get(key);
    }
    public removeData(key: string):boolean {
        let has = this.store.has(key);
        if(has){
           return  this.store.delete(key);
        }
        return false;
    }
    public clear(){
        this.store.clear();
    }
 

}
