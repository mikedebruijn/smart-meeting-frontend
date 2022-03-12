import {v4 as uuidv4} from 'uuid'
import Store from "~/utility/store.js"
export class Minute {
    editing=false;
    highlight=false;
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
            highlight:this.highlight,
            agendaId:this.agendaId,
        }
    }
    store() {
        Store.save(this.object(), 'minutes');
    }
    remove() {
        Store.remove(this.id, 'minutes');
    }
    parse(item){
        this.id = item.id;
        this.body = item.body;
        this.highlight = item.highlight;
        this.agendaId = item.agendaId;
        this.date = new Date(item.date);
    }
    static getByAgendaId(id){
        let items = Store.loadTable('minutes');
        return items.reduce((result,item) => {
            if(item.agendaId == id) {
                let minute = new Minute();
                minute.parse(item);
                result.push(minute);
            }
            return result;
        },[]);
    }
    static getMany(ids){
        let items = Store.getAll(ids,'minutes');
        return items.reduce((result,item) => {
            let minute = new Minute();
            minute.id = item.id;
            minute.body = item.body;
            minute.date = new Date(item.date);
            result.push(minute);
            return result;
        },[]);
    }
}
