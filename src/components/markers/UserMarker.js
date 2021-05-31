import React, { Component } from "react";

const google = window.google;

class UserMarker extends Component {
  createMarker = (latlng, map, placeID, name, address) => {
    let marker = new google.maps.Marker({
      position: latlng,
      map: this.state.map,
      placeId: placeID,
    });

    const contentString = `<div>
         <h1>${name}</h1>
        <p> ${address} </p>
        <div><img src='https://maps.googleapis.com/maps/api/streetview?size=200x100&location=${latlng.lat},${latlng.lng}&fov=80&heading=70&pitch=0&key=${process.env.REACT_APP_API_MAP_KEY}' /></div>    
    </div>    `;
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
  };

  render() {
    return <div></div>;
  }
}

export default UserMarker;
