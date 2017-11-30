requirejs.config({
    paths: {
        jQuery : '../lib/jquery-3.2.1'
    }
});

requirejs(['jQuery'],function(){

    requirejs(['index','dragable','load_ep','load_yz','global','load_pld'],function(){
        requirejs(['cookie','supplier']);

    })
})