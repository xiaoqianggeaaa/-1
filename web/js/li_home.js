requirejs.config({
    paths: {
        jQuery : '../lib/jquery-3.2.1'
    }
});

requirejs(['jQuery'],function(){
    requirejs(['index','dragable','load_yz','supplier'],function(){
        requirejs(['cookie']);
    })
})