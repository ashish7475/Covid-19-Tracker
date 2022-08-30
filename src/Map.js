import React from "react";
import { MapContainer as LeafletMap, TileLayer,useMapEvents } from "react-leaflet";
import ChangeMapView from "./change";
import "./Map.css";
import { showDataOnMap } from "./util";

function myComponent(){
 
}

function Map({ countries, casesType, center, zoom }) {
  
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
       
        {showDataOnMap(countries, casesType)}
        <ChangeMapView cords={center} zoom={zoom}/>
        
      </LeafletMap>
    </div>
  );
}

export default Map;