// build map 
var map = L.map("map", {
    center: 
    [40.7, -94.5],
    zoom: 2
});

// add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// link geojson data 
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"


// create function to set colors for markers (deeper depths are darker)
function colorMap(depth) {
    if (depth > 90) return "#7A2A90";
    if (depth > 70) return "#CE1B66"; 
    if (depth > 50) return "#E02726";
    if (depth > 30) return "#F16921";
    if (depth > 10) return "#F9C115";
    if (depth > -10) return "#FFF23D";
    else return "##FFF8CF";
    };


// create function to define radius of magnitude 
function getRadius(magnitude) {
    if (magnitude === 0) {
    return 1;
    };

    return magnitude * 3;
}

// create function to create circle marker with a popup 
function createCircleMarker(feature, latlng) {
  var popupContent = "<b>Location:</b> " + feature.properties.place +
                     "<br><b>Depth:</b> " + feature.geometry.coordinates[2] +
                     "<br><b>Magnitude:</b> " + feature.properties.mag;
  return L.circleMarker(latlng, {
      opacity: 50,
      fillOpacity: 50,
      fillColor: colorMap(feature.geometry.coordinates[2]),
      color: "#FFFFFF",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
  }).bindPopup(popupContent);
}

//  pull geoJSON data 
d3.json(link).then(function(data){
  // add geoJSON layer with circle markers
  L.geoJSON(data, {
      pointToLayer: createCircleMarker
  }).addTo(map);
});