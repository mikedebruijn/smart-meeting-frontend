export default {
    methods:{
        // Fix height of textarea
        fixHeight(area) {
            if(area){
                area.style.height = "auto";
                let h = area.scrollHeight;
                if(h < 36) {
                    h = 36;
                }
                area.style.height = (h + 8) + 'px';
                area.scrollTop = 0;
            }
        }
    }
}
