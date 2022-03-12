import {v4 as uuidv4} from 'uuid'
import Store from "~/utility/store.js"
export class Decision {
    editing=false;
    body='';
    date=null;
    agendaId=null;
    constructor(agendaId){
        this.id = uuidv4();
        this.date = new Date();
        this.agendaId = agendaId;
    }
    formattedDate(){
        let options = {year: 'numeric', month: 'long', day: 'numeric', minutes:'numeric',hour:'2-digit',minute:'2-digit'};
        return this.date.toLocaleDateString(undefined, options);
    }
    object(){
        return {
            id:this.id,
            date:this.date.toISOString(),
            body:this.body,
            agendaId:this.agendaId,
        }
    }
    store() {
        Store.save(this.object(), 'decisions');
    }
    remove() {
        Store.remove(this.id, 'decisions');
    }
    parse(item){
        this.id = item.id;
        this.body = item.body;
        this.agendaId = item.agendaId;
        this.date = new Date(item.date);
    }
    static getByAgendaId(id){
        let items = Store.loadTable('decisions');
        if(!items) {
            return [];
        }
        return items.reduce((result,item) => {
            if(item.agendaId == id) {
                let decision = new Decision();
                decision.parse(item);
                result.push(decision);
            }
            return result;
        },[]);
    }
    static getMany(ids){
        let items = Store.getAll(ids,'decisions');
        return items.reduce((result,item) => {
            let decision = new Decision();
            decision.id = item.id;
            decision.body = item.body;
            decision.date = new Date(item.date);
            result.push(decision);
            return result;
        },[]);
    }
}
