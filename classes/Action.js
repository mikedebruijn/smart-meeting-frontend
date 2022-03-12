import {v4 as uuidv4} from 'uuid'
import Store from "~/utility/store.js"
export class Action {
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
        Store.save(this.object(), 'actions');
    }
    remove() {
        Store.remove(this.id, 'actions');
    }
    parse(item){
        this.id = item.id;
        this.body = item.body;
        this.agendaId = item.agendaId;
        this.date = new Date(item.date);
    }
    static getByAgendaId(id){
        let items = Store.loadTable('actions');
        if(!items) {
            return [];
        }
        return items.reduce((result,item) => {
            if(item.agendaId == id) {
                let action = new Action();
                action.parse(item);
                result.push(action);
            }
            return result;
        },[]);
    }
    static getMany(ids){
        let items = Store.getAll(ids,'actions');
        return items.reduce((result,item) => {
            let action = new Action();
            action.id = item.id;
            action.body = item.body;
            action.date = new Date(item.date);
            result.push(action);
            return result;
        },[]);
    }
}
