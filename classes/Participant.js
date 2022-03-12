import {v4 as uuidv4} from 'uuid'
import Store from "~/utility/store.js"
export class Participant {
    constructor(name, email, jobtitle){
        this.id = uuidv4();
        this.name = name;
        this.email = email;
        this.jobTitle = jobtitle;
    }
    object(){
        return {
            id:this.id,
            name:this.name,
            email:this.email,
            jobTitle:this.jobTitle,
        }
    }
    store() {
        Store.save(this.object(), 'participants');
    }
    static getMany(ids){
        let items = Store.getAll(ids,'participants');
        return items.reduce((result,item) => {
            let participant = new Participant(item.name,item.email,item.jobTitle);
            participant.id = item.id;
            result.push(participant);
            return result;
        },[]);
    }
}
