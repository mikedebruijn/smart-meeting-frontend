import {v4 as uuidv4} from 'uuid'
import Store from "~/utility/store.js"
export class TreeNode {
    static table = "items";
    children = [];
    constructor(label, children){
        this.id = uuidv4();
        this.label = label;
        if(children) {
            this.children = children;
        }
    }
    object(){
        return {
            id:this.id,
            label:this.label,
            children:Store.extractIds(this.children),
        };
    }
    store(){
        Store.save(this.object(), TreeNode.table);
        if(this.children) {
            this.children.forEach(child => {
                child.store()
            });
        }
    }
    copy(){
        let node = new TreeNode(this.label);
        this.children.forEach(child => node.children.push(child));
        return node;
    }
    static getMany(ids){
        let items = Store.getAll(ids,TreeNode.table);
        return items.reduce((result,item) => {
            let node = new TreeNode(item.label);
            node.id = item.id;
            if (item.children) {
                node.children = TreeNode.getMany(item.children);
            }
            result.push(node);
            return result;
        },[]);
    }
}
