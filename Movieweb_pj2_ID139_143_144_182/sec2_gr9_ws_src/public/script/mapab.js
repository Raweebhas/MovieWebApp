//const it ={
  //  ict:{lat: 13.7944, lng: 100.3247},population: 2000,
    //}, };
function ourLMap() {
    const thailand = { lat: 13.7944, lng: 100.3247 };//ICT GROUP 9 LOCATION
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 11,
      center: thailand,
    });
    const marker = new google.maps.Marker({
      position: thailand,
      map: map,
    });
    //const it
  }