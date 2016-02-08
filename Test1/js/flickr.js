$(document).ready(function(){

//Function to extract Flickr Data
(function() {
  var favourites = ""	
  var flickerURL = "http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=?&tags=london";
  $.getJSON(flickerURL)
    .done(function(data) {
      $.each(data.items,function(i,item) {
        $("<img>").attr("src",item.media.m ).attr("id",i).appendTo("#images");
        if(i === 20) {
          return false;
        }	
      });
	
	
//Function to set Cookie to remember user images	 
	function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}
console.log(document.cookie);
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) 
            return c.substring(name.length, c.length);
    }
    return "";
}

//Function to apply class if cookie is set
jQuery(function(){
    $("img").each(function(){
        if(getCookie($(this).attr("src"))=="on"){   
            $(this).addClass("imgselected");
        }
    });

//On click, either add or remove the class and set the cookie appropriately    
    $("img").on('click', function() {
        if ($(this).attr("class") == "imgselected") {
            setCookie($(this).attr("src"),"off",30);
	        } else {
            setCookie($(this).attr("src"),"on",30);
			$(this).removeClass("imgselected");
        }
        $(this).toggleClass("imgselected");
    });
});
	 
    });
		
})();

});
