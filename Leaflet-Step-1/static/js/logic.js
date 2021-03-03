//Create a create map function that is going to be called below when the data is collected from the json
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
 //--------------------------------------------------------------------------------------------------------------------------------------------- 
//the create circle function is going to update the map with the earthquake data in the form of circles
//the function takes a paraameter that later be replaced

function createCircles(response) {

    // Pull the response.features from the json
    var quakes = response.features;
    console.log(quakes);


    // Initialize an array to hold circles for the map
    var Circles = [];

    // Loop through the circles array
    for (var i = 0; i < quakes.length; i++) {
        var quake = quakes[i].geometry.coordinates;
        var mag = quakes[i].properties.mag
        console.log(mag);
        

        // For each circle, create a marker and bind a popup with the place and magnitude number
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

    // Create a layer group made from the circles array, pass it into the createMap function
    createMap(L.layerGroup(Circles));

}


//---------------------------------------------------------------------------------------------------------------------------
//get the json data from earthquakes in the last 7 days
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createCircles);

//circles need colors and fill colors, since the choose color function was called inside the circle function, a choosecolor function is created 
//this function uses a for loop to set the color of different magnitude level based on their numbers and
function chooseColor(magnitude) {
    return magnitude > 5 ? "red":
           magnitude > 4 ? "orange":
           magnitude > 3 ? "gold":
           magnitude > 2 ? "yellow":
           magnitude > 1 ? "yellowgreen":
    //else                 
      "greenyellow"

}
// the markersize funcition is used to set radius of the marker on the map

function markerSize(magnitude) {
    return magnitude * 20000
  }



