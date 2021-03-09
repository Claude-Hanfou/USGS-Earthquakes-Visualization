## USGS-Earthquakes-Visualization

The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. 

The project centers around building a new set of tools that will allow to visualize the USGS earthquake data. USGS collectS a massive amount of data from all over the world each day, and this project focuses on giving  a meaningful way of displaying the data. The goal is to better educate the public and other government organizations (and hopefully secure more funding..) on issues facing our planet.


<img src="https://github.com/Claude-Hanfou/USGS-Earthquakes-Visualization/blob/main/Images/gif.gif" width="1000" height="500" />  


## Leaflet1

The USGS provides earthquake data in a number of different formats, updated every 5 minutes. On the USGS GeoJSON Feed page, the data set selected was displayed on the map below. A JSON representation of that data was used to create a circle on the map below. 


A map was plotted using Leaflet and it plots all of the earthquakes from the data set based on their longitude and latitude.The data markers reflects the magnitude of the earthquake by their size and and depth of the earth quake by color. Earthquakes with higher magnitudes appear larger and earthquakes with greater depth appear darker in color.
Also popups that provide additional information about the earthquake when a marker is clicked were included on the map.The legend provides context for the map data.


![alt text](https://github.com/Claude-Hanfou/USGS-Earthquakes-Visualization/blob/main/Images/Leaf%201.PNG "Earthquake 1")


## Leaflet 2

IN Leaflet 2 a second dataset was included on the map. The data set illustrates the relationship between tectonic plates and seismic activity. The second data set which is data about tectonic plates can be found at https://github.com/fraxen/tectonicplates.
A number of base maps to choose from were added to the map. Also, the datasets were separated out into two differentinto overlays that can be turned on and off
independently. Layer controls were added to the map.


![alt text](https://github.com/Claude-Hanfou/USGS-Earthquakes-Visualization/blob/main/Images/Leaf%202.PNG "Earthquake 2")

