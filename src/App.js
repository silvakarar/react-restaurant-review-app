import React from "react";
import Map from "./components/map/Map";
import Header from "./components/header/Header";
import AddNewRestaurantForm from "./components/addNewRestaurantForm/AddNewRestaurantForm";

const App = () => {
    const google = window.google;
    return (
      <div className="App">
        <Header />
        <Map
          id="myMap"
          options={{
            center: { lat: 33.7018833, lng: -118.0270592 },
            zoom: 14,
            mapTypeControl: true,
            mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              position: google.maps.ControlPosition.BOTTOM_RIGHT,
            },
            zoomControl: true,
            zoomControlOptions: {
              position: google.maps.ControlPosition.RIGHT_BOTTOM,
            },
            scaleControl: true,
            streetViewControl: true,
            streetViewControlOptions: {
              position: google.maps.ControlPosition.RIGHT_BOTTOM,
            },
            fullscreenControl: true,
            fullscreenControlOptions: {
              position: google.maps.ControlPosition.RIGHT_BOTTOM,
            },
          }}
          onMapLoad={(map) => {}}
        >
        </Map>
      </div>
    );
  }


export default App;
