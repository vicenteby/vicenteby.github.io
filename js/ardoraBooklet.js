$(document).ready(function(){
   $.fn.booklet.defaults = {
      name:"index",
      width:1500,height:905,speed:800,direction:"LTR",
      startingPage:1,easing:"easeInOutQuad",easeIn:"easeInQuad",easeOut:"easeOutQuad",
      closedFrontTitle:"Beginning",closedFrontChapter:"Beginning of Book",closedBackTitle:"End",closedBackChapter:"End of Book",
      covers:true,
      closed:true,
      autoCenter:true,
      pagePadding:10,pageBorder:0,
	    pageNumbers:true,
	    manual:true,
      hovers:true,hoverWidth:50,hoverSpeed:500,hoverThreshold:0.25,overlays:true,tabs:true,tabWidth:60,tabHeight:13,
      nextControlText:"Siguiente",previousControlText:"Anterior",
      nextControlTitle:"Siguiente",previousControlTitle:"Anterior",
      arrows:false,
      arrowsHide:false,
      cursor:"pointer",hash:true,hashTitleText:" - Page ",
keyboard:true,
      next:null, prev:null, auto:false, delay:5000, pause:null, play:null, menu:null,pageSelector:true,chapterSelector:true,
      shadows:true,shadowTopFwdWidth:166,shadowTopBackWidth:166,shadowBtmWidth:50,before:function(){},after:function(){}
      }
 $("#mybook").booklet();
});
