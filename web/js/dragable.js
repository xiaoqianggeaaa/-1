$(".first p").on("click",function(){
    $liNum = $(this).next().find("li").length; 
    $(this).closest("li").stop().animate({height:($liNum+1) * 39}).siblings("li").animate({height:39});
    if($(this).closest("li").css("height").slice(0,2) != 39){
        $(this).closest("li").stop().animate({height:39});
    }   
})
