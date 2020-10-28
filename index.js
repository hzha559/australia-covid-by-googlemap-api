// This example adds a marker to indicate the position of Bondi Beach in Sydney,
// Australia.
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: -26, lng: 134 },
	
  });
  let geo=[
  {lat: -38, lng: 145},//mel
  {lat: -34, lng: 151},//syd
  {lat: -27.5, lng: 153},//bris
  {lat: -32, lng: 116},//per
	{lat: -35, lng: 138.5},//ade
	{lat: -43, lng: 147.3},//hob
	{lat: -35.3, lng: 149.1},//cab
	{lat: -12.5, lng: 130.9},//dar
  ];
  let magnitude=[20341,4398,1167,764,494,230,114,33];
  let magnitude2=[817,53,6,9,4,13,3,0]
  let description=["Victoria, 20341, 817",
  "New South Wales, 4398, 53",
  "Queensland, 1167, 6",
  "Westen Australia, 764, 9",
  "South Australia, 494, 4",
  "Tasmania, 230, 13",
  "Australia Capital Territory, 114, 3",
  "Northern Territory, 33, 0",]
  let markers=[
  
  ];
  let circles2=[
  
  ];
  let circles=[
  
  ];
  let poly=[];
  //console.log(map.getCenter().lat(),map.getCenter().lng());
  /*
  infoWindow = new google.maps.InfoWindow();
  navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          //map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
  */
	addmarker(markers,map);
    setMapOnAll(map);
    addcircle(circles,1,map);
    setCircleOnAll(1,map);		
	addcircle(circles,0,map);
    setCircleOnAll(0,map);	

   const flightPlanCoordinates = [
    
    
  ];
  
  function refreshline(latLng,map){
	  //if (flightPlanCoordinates.length>=2){
	flightPlanCoordinates.pop();
	//console.log(flightPlanCoordinates);
	const flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
	editable: true,
  });
	  poly.pop();
  poly.push(flightPath);
  }//}
  
  function addline(latLng,map){
	setLineOnAll(null);
	flightPlanCoordinates.push(latLng);
	console.log("line",flightPlanCoordinates);
	if (flightPlanCoordinates.length>1){
		var distance=google.maps.geometry.spherical.computeDistanceBetween(flightPlanCoordinates[flightPlanCoordinates.length-2],flightPlanCoordinates[flightPlanCoordinates.length-1])/1000
	console.log("distance ",distance);
	infoWindow = new google.maps.InfoWindow();
	  infoWindow.setPosition(flightPlanCoordinates[flightPlanCoordinates.length-1]);
      infoWindow.setContent("distance is "+distance+" km");
      infoWindow.open(map);
	}
	const flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
	editable: true,
  });
  if (poly.length<1){
  poly.push(flightPath);
  }
  else{
	  poly.pop();
  poly.push(flightPath);
  }
  }

  function markereve(geo,description){
	  infoWindow = new google.maps.InfoWindow();
	  infoWindow.setPosition(geo);
      infoWindow.setContent(description);
      infoWindow.open(map);

		console.log("here");
		
  };
  
  function addmarker(map){
	  for(let i=0;i<geo.length;i++){
  const c=new google.maps.Marker({
    position: geo[i] ,
    map:map,
	//draggable:true,
	//label:"ML "+magnitude[i],
  });
  c.addListener("click",() => {
    markereve(geo[i],description[i]);
  });
  markers.push(c);
	  }
  //console.log(markers);
  }
  
  function addcircle(circles,flag,map){
	  for(let i=0;i<geo.length;i++){
		  if (flag==1){
	  var a=new google.maps.Circle({
		  center:geo[i],
		  map:map,
		  radius:magnitude[i]*20,
		  strokeColor: "#FF0000",
		  fillColor: "#FF0000",
		  fillOpacity: 0.35,
	  })
	  circles.push(a);
	  }
	  if (flag==0){
	  var a=new google.maps.Circle({
		  center:geo[i],
		  map:map,
		  radius:magnitude2[i]*100,
		  strokeColor: "#000000",
		  fillColor: "#000000",
		  fillOpacity: 0.35,
	  })
	  circles2.push(a);
	  }
	  }
  }
  
  function setCircleOnAll(flag,map) {
	  console.log("setcircle",circles);
	  if (flag=1){
  for (let i = 0; i < circles.length; i++) {
    circles[i].setMap(map);
  }
	  }
	  else if (flag=1){
  for (let i = 0; i < circles2.length; i++) {
    circles2[i].setMap(map);
  }
	  }
}
  
  function setLineOnAll(map) {
	  //console.log("set",markers);
  for (let i = 0; i < poly.length; i++) {
    poly[i].setMap(map);
  }
}

  function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

  function removeLatest(map) {
  //setMapOnAll(null);
  //markers.pop();
  setLineOnAll(null);
  refreshline();
  //console.log(markers);
}
  
  //flightPath.setMap(map);
  google.maps.event.addListener(map, "click", (event) => {
	  //flightPath.setMap(null);
		console.log("click",event.latLng.lat(),event.latLng.lng());
		//console.log("trans "+flightPlanCoordinates[1]);
		//flightPlanCoordinates[1].lat=event.latLng.lat();
		//flightPlanCoordinates[1].lng=event.latLng.lng();
		//console.log(flightPlanCoordinates[0],flightPlanCoordinates[1]);
	    //flightPath.setPath=flightPlanCoordinates;
		//flightPath.setMap(map);
		//addmarker(event.latLng, map);
		//setMapOnAll(map);
		addline(event.latLng, map);
		setLineOnAll(map);
	//a=addcircle(event.latLng, map);
	
  });
  google.maps.event.addListener(map, "rightclick", (event) => {
	  removeLatest();
	  //setMapOnAll(map);
	  console.log("remove");
	  setLineOnAll(map);
  //flightPath.setMap(null);
  });
  google.maps.event.addListener(map, "drag", (event) => {
	  //a.setMap(null);
	  console.log("drag");
    //addMarker(event.latLng, map);
  });
  const image =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
  const beachMarker = new google.maps.Marker({// beach marker at australia
    position: { lat: -33.89, lng: 151.274 },
    map,
	draggable:true,
    icon: image,
  });
  
  
}
