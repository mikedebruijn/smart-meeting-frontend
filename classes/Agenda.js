import {v4 as uuidv4} from 'uuid'
import Store from "~/utility/store.js"
import {Participant} from "~/classes/Participant.js"
import {Minute} from "~/classes/Minute.js"
import {Decision} from "~/classes/Decision.js"
import {TreeNode} from "~/classes/TreeNode.js"
export class Agenda {
    id="";
    subject="";
    date="";
    location="";
    group;

    participants=[];
    items=[];
    decisions=[];
    minutes=[];
    actions=[];

    formattedDate(){
        let options = {year: 'numeric', month: 'long', day: 'numeric', minutes:'numeric',hour:'2-digit',minute:'2-digit'};
        return new Date(this.date).toLocaleDateString(undefined, options);
    }

    constructor(id){
        if(id) {
            this.id = id;
        } else {
            this.id = uuidv4();
        }
    }
    setDateNow(){
        let date = new Date();
        // fix minutes to 15 minute steps
        date.setMinutes(Math.ceil(date.getMinutes() / 15) * 15);
        // fix timezone
        let offset = date.getTimezoneOffset();
        date.setMinutes(date.getMinutes() - offset);
        // to isso string
        let iso = date.toISOString();
        // to local datetime string
        this.date = iso.substring(0, iso.length - 8);
    }

    object() {
        return {
            id:this.id,
            subject:this.subject,
            date:this.date,
            location:this.location,
            participantIds:Store.extractIds(this.participants),
            itemIds:Store.extractIds(this.items),
        };
    }
    copy(){
        let copy = new Agenda(); 
        copy.subject = this.subject;
        copy.location = this.location;
        copy.group = this.group;
        copy.setDateNow();
        this.participants.forEach(p => {
            copy.participants.push(new Participant(p.name, p.email, p.jobTitle));
        });
        this.items.forEach(i => copy.items.push(i.copy()));
        return copy;
    }
    store(){
        Store.save(this.object(), 'agendas');
        this.items.forEach(item => {
            item.store();
        });
        this.participants.forEach(participant => {
            participant.store();
        });
    }
    static loadAll(){
        let items = Store.loadTable('agendas');
        if(!items) {
            console.warn('loading item not possible');
            return [];
        }
        let agendas = [];
        items.forEach(item => {
            let agenda = new Agenda(item.id);
            agenda.parse(item);
            agendas.push(agenda);
        });
        return agendas;
    }
    parse(agenda){
        this.subject = agenda.subject;
        this.date = agenda.date;
        this.location = agenda.location;
        this.items = TreeNode.getMany(agenda.itemIds);
        this.participants = Participant.getMany(agenda.participantIds);
        this.minutes = Minute.getByAgendaId(this.id).sort((a,b) => b.date - a.date)
        this.decisions = Decision.getByAgendaId(this.id).sort((a,b) => b.date - a.date)
    }
    static load(id){
        let item = Store.get(id, 'agendas');
        if(!item) {
            console.warn('loading item not possible');
            return;
        }
        let agenda = new Agenda(item.id);
        agenda.parse(item);
        return agenda;
    }
    static remove(id){
        Store.remove(id, 'agendas');
    }
}
