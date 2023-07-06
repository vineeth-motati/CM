import React from "react";
import { useQuery } from "@tanstack/react-query";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Country {
  country: string;
  active: number;
  recovered: number;
  deaths: number;
  countryInfo: {
    lat: number;
    long: number;
  };
}

const Map: React.FC = () => {
  const { data: countriesData, isLoading } = useQuery<Country[]>(
    ["countriesData"],
    async () => {
      const response = await fetch("https://disease.sh/v3/covid-19/countries");
      const data = await response.json();
      return data;
    }
  );

  if (isLoading) {
    return <div>Loading country data...</div>;
  }

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-bold mb-4">COVID-19 Map</h2>
      <MapContainer
        style={{ height: "400px", width: "100%" }}
        center={{ lat: 0, lng: 0 }}
        zoom={2}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {countriesData?.map((country: Country) => (
          <Marker
            key={country.country}
            position={[country.countryInfo.lat, country.countryInfo.long]}
          >
            <Popup>
              <div>
                <h3>{country.country}</h3>
                <p>Active cases: {country.active}</p>
                <p>Recovered cases: {country.recovered}</p>
                <p>Deaths: {country.deaths}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
