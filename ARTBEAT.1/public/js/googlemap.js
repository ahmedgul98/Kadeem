function myMap() {
var mapOptions = {
  zoom: 17,
  center: new google.maps.LatLng(42.281633,-87.971466),
   mapTypeId: google.maps.MapTypeId.terrain
}
var map = new google.maps.Map(document.getElementById("map"), mapOptions);

var marker = new google.maps.Marker({
    position: new google.maps.LatLng(42.281633,-87.971466),
	map : map,
    title:"Our Location!"
});

// To add the marker to the map, call setMap();
marker.setMap(map);
}
function open(){
window.open("form.html");
window.open("contactUs.html")	
}
