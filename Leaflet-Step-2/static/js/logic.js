

 //Create a layer group made for the circles and tectonic plates
 var earthquakes = L.layerGroup();
 var tectonic_plates = L.layerGroup(); 

 // Create the tile layer that will be the background of our map
 var satelitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-v9",
    accessToken: API_KEY
  });

  var graymap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });


  var outdoorsmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "outdoors-v11",
    accessToken: API_KEY
  });




// Create a baseMaps object to hold the lightmap layer
var baseMaps = {
    "Satelite": satelitemap,
    "Grayscale": graymap,
    "Outdoors" : outdoorsmap
  };

// Create an overlayMaps object to hold the earthquakes layer
var overlayMaps = {
    "Earthquakes": earthquakes,
    "Tectonic Plates" : tectonic_plates
  };

// Create the map object with options
var myMap = L.map("mapid", {
    center: [40.73, -74.0059],
    zoom: 3,
    layers: [satelitemap, earthquakes]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps,overlayMaps,  {
    collapsed: false
  }).addTo(myMap);




var legend = L.control({ position: "bottomright" });
legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Earthquake Depth</h4>";
    div.innerHTML += '<i style="background: yellowgreen"></i><span>-10-10</span><br>';
    div.innerHTML += '<i style="background: limegreen"></i><span>10-30</span><br>';
    div.innerHTML += '<i style="background: yellow"></i><span>30-50</span><br>';
    div.innerHTML += '<i style="background: gold"></i><span>50-70</span><br>';
    div.innerHTML += '<i style="background: orange"></i><span>70-90</span><br>';
    div.innerHTML += '<i style="background: red"></i><span>90+</span><br>';
    return div;
  };
  legend.addTo(myMap);
  





url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"    
link = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

   
d3.json(url, function(earthquakeData) {
    // the markersize funcition is used to set radius of the marker on the map
    // Determine the marker size by magnitude
    function markerSize(magnitude) {
      return magnitude * 4;
    };
    // Determine the marker color by depth
    
    //this function uses a for loop to set the color of different magnitude level based on their numbers and
    function chooseColor(depth) {
      switch(true) {
        case depth > 90:
          return "red";
        case depth > 70:
          return "orange";
        case depth > 50:
          return "gold";
        case depth > 30:
          return "gold";
        case depth > 10:
          return "yellow";
        default:
          return "greenyellow";
      }
    }
  
    // Create a GeoJSON layer containing the features array
    // Each feature a popup describing the place and time of the earthquake
    L.geoJSON(earthquakeData, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, 
          // Set the style of the markers based on properties.mag
          {
            radius: markerSize(feature.properties.mag),
            fillColor: chooseColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.7,
            color: "black",
            stroke: true,
            weight: 0.5
          }
        );
      },
      onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place + "</h3><h3>Magnitude" + feature.properties.mag + "</h3>"+ "<hr><p>" +
         new Date(feature.properties.time) + "</p>"  )
      }
    }).addTo(earthquakes);
    // Sending our earthquakes layer to the createMap function
    earthquakes.addTo(myMap);


})


 // Our style object
 var mapStyle = {
    color: "gold",
    weight: 1.5
  };


  // Grabbing our GeoJSON data..
  d3.json(link, function(data) {
    // Creating a geoJSON layer with the retrieved data
     L.geoJson(data, {
      // Passing in our style object
      style: mapStyle
    }).addTo(tectonic_plates);
    tectonic_plates.addTo(myMap)
  })

  
