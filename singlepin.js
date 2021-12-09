mapboxgl.accessToken = 'pk.eyJ1IjoiZHZscHJuZCIsImEiOiJja3FtN29qczIweThjMnJwaHFjeWk0eDZlIn0.crcK_UCsmkgv3HUnTXDMJg';
  
navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy: true})

function successLocation(position) {
    console.log(position)
    setupMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation() {
    setupMap(-6.36, 56.32)
}

let markerPin = {
    marker: null,
    comment: ''
};


function setupMap(center) {
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 15
      });
      map.addControl(new mapboxgl.NavigationControl());
      map.on('click', function(e) {
          addMarker(e.lngLat);
          lngLat = marker.getLngLat();
          coordinates.style.display = 'flex';
          coordinates.innerHTML = '<div><p>Longitude:  </p><p>' + lngLat.lng + '</p></div><br /><div><p>Latitude:  </p><p>' + lngLat.lat +'</p></div>';
      })   
}

const coordinates = document.getElementById('coordinates');
const comment = document.getElementById('comment');

function addMarker(lngLat) {
    if(markerPin.marker === null){
    marker = new mapboxgl.Marker({
        draggable: true,
        color: 'green'
    })
    .setLngLat(lngLat)
    .addTo(map)
    markerPin.marker = marker;
    marker.on('dragend',onDragEnd);
}
}

function onDragEnd() {
    var lngLat = marker.getLngLat();
    coordinates.innerHTML = '<div><p>Longitude:  </p><p>' + lngLat.lng + '</p></div><br /><div><p>Latitude:  </p><p>' + lngLat.lat +'</p></div>'; 
    popup.setLngLat(lngLat)   
}

