export default {
    loadTable(table){
        let items = localStorage.getItem(table);
        if(!items) return;
        try {
            items = JSON.parse(items);
            return items;
        } catch(e) {
            console.error('Error parse localstorage table',e);
        }
    },
    /**
     * Store a json object as table row
     */
    save(row, table){
        let items = this.loadTable(table);
        let isNew = true;
        if (items) {
            items.forEach((item, index) => {
                if(item.id == row.id){
                    items[index] = row;
                    isNew = false;
                }
            });
        } else {
            items = [];
        }
        if(isNew){
            items.push(row);
        }
        this.saveTable(items, table);
    },
    saveTable(items, table){
        localStorage.setItem(table,JSON.stringify(items));
    },
    /**
     * Extract ids from an array of objects
     *
     * useful for HABTM relations
     */
    extractIds(arr){
        if(!arr) {
            return null;
        }
        let result = arr.reduce((prev, cur) => {
            prev.push(cur.id);
            return prev;
        }, []);
        return result;
    },
    /**
     * Get a row by id
     */
    get(id, table){
        let items = this.loadTable(table);
        if(!items) {
            console.error('table not found');
        } else {
            return items.find(item => item.id == id);
        }
    },
    getAll(ids, table){
        if(!ids) return null;
        let items = this.loadTable(table);
        return items.filter(item => ids.indexOf(item.id) > -1);
    },
    remove(id, table){
        let items = this.loadTable(table);
        let filtered = items.filter(item => item.id != id);
        this.saveTable(filtered, table);
    }
}

