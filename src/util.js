import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
    cases: {
      color: "crimson",
      fillColor:"red"
      

    },
    recovered: {
      color: "green",
      fillColor:"green"

    },
    deaths: {
      color: "red",
      fillColor:"red"
    },
  };
export const sortData = (data)=>{
    const sortedData = [...data];

    sortedData.sort((a,b)=>a.cases>b.cases?-1:1)
    return sortedData;
}

//draw circles on map
export const showDataOnMap = (data,casesType)=>(
data.map(country=>(
    <Circle
     center={[country.countryInfo.lat,country.countryInfo.long]}
     fillOpacity={0.4}
     pathOptions = {casesTypeColors[casesType]}
     fillColor={casesTypeColors[casesType]}
     radius={ Math.sqrt(country[casesType])* 100}
    >
        <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>

))
);

export const prettyPrintStat= (stat)=>(
    stat? `+${numeral(stat).format("0.0a")}`:"+0"
)

