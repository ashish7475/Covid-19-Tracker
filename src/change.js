import {  useMap } from "react-leaflet";

 function ChangeMapView({ cords,zoom }) {
    const map = useMap();
    map.setView(cords, zoom);
  
    return null;
  }

  export default ChangeMapView