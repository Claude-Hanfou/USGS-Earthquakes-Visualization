function createMap(earthquakes) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "light-v10",
      accessToken: API_KEY
    });
  
    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
      "Light Map": lightmap
    };
  
    // Create an overlayMaps object to hold the earthquakes layer
    var overlayMaps = {
      "Earthquakes": earthquakes
    };
  
    // Create the map object with options
    var map = L.map("mapid", {
      center: [40.73, -74.0059],
      zoom: 3,
      layers: [lightmap, earthquakes]
    });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps,overlayMaps,  {
      collapsed: false
    }).addTo(map);
  }
  

function createCircles(response) {

    // Pull the "stations" property off of response.data
    var quakes = response.features;
    console.log(quakes);


    // Initialize an array to hold bike markers
    var Circles = [];

    // Loop through the stations array
    for (var i = 0; i < quakes.length; i++) {
        var quake = quakes[i].geometry.coordinates;
        var mag = quakes[i].properties.mag
        console.log(mag);
        

        // For each station, create a marker and bind a popup with the station's name
        var Circle = L.circle([quake[1], quake[0]], {
                fillOpacity: .6,
                color: chooseColor(quakes[i].properties.mag),
                fillColor: chooseColor(quakes[i].properties.mag),
                radius: markerSize(quakes[i].properties.mag)
            })
            .bindPopup("<h3>" + quakes[i].properties.place + "<h3><h3>Magnitude: " + quakes[i].properties.mag + "</h3>");
          
        // Add the marker to the Circles array
        Circles.push(Circle);
    }

    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(Circles));

}

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createCircles);

function chooseColor(magnitude) {
    return magnitude > 5 ? "red":
           magnitude > 4 ? "orange":
           magnitude > 3 ? "gold":
           magnitude > 2 ? "yellow":
           magnitude > 1 ? "yellowgreen":
    //else                 
      "greenyellow"

}

function markerSize(magnitude) {
    return magnitude * 30000
  }



