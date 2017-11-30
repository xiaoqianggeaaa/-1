requirejs.config({
    paths: {
        jQuery : '../lib/jquery-3.2.1'
    }
});

requirejs(['jQuery'],function(){


    requirejs(['index','dragable','load_yz',,'load_ep','supplier','global','load_pld','load_yz'],function(){
        requirejs(['cookie']);


    })
})