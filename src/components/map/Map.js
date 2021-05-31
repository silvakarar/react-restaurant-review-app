import React, { Component } from "react";
import Sidebar from "../sidebar/Sidebar";
import RestaurantData from "../local-json-restaurants/RestaurantData";
import resData from "../../resData.json";
import GoogleRestaurant from "../googleRestaurant/GoogleRestaurant";
import AddNewRestaurantForm from "../addNewRestaurantForm/AddNewRestaurantForm";
import RestaurantContent from "../local-json-restaurants/RestaurantContent";
import { v1 as uuidv1 } from "uuid";
import "./Map.css";

const google = window.google;
let map;
let service;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      googleRestaurant: [],
      newGoogleForm: false,
      latlng: "",
      newForm: null,
      googleMarkersArray: [],
      nonGoogleMarkersArray: [],
      filteredRestaurants: [],
      lastMapClickedPos: {},
      formDataRestaurants: [],
      forceFilterInit: false,
    
    };

    this.onScriptLoad = this.onScriptLoad.bind(this);
    this.createMarker = this.createMarker.bind(this);
    this.googlePlacesSearch = this.googlePlacesSearch.bind(this);
    this.callback = this.callback.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
    this.refreshMarkersAndSidebar = this.refreshMarkersAndSidebar.bind(this);
  }

  getUserLocation(map) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(pos);
          new window.google.maps.Marker({
            position: pos,
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
          });
          this.googlePlacesSearch(map);
        },
        function () {
          console.log("geo location failed");
        }
      );
    } else {
      console.log("browser does not support geo location");
    }
  }

  onScriptLoad(props) {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options
    );

    this.props.onMapLoad(map);
    this.getUserLocation(map);
    this.setState({
      map: map,
    });
    this.listenToMapClickEvent(map);
    this.newLocation(map);
    this.localFileRestaurantMarkers(map);
  }

  googlePlacesSearch(map) {
    const request = {
      location: map.getCenter(),
      radius: "5000",  
      type: ["restaurant"],
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, this.callback);
  }

  callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      let shouldFilter = false;
      if (0 === this.state.googleRestaurant.length) {
        shouldFilter = true;
      }
      this.setState({
        googleRestaurant: results,
        forceFilterInit: shouldFilter,
      });
    }
  }

  localFileRestaurantMarkers(map) {
    resData.map((restaurant) => {
      return this.createNonGoogleMarker(
        restaurant.restaurantName,
        restaurant.restaurantAddress
      );
    });
  }

  // JSON markers
  createNonGoogleMarker = (latlng, map, name, address) => {
    let marker = new google.maps.Marker({
      position: latlng,
      map: this.state.map,
    });

    const contentString = `<div> 
        <h1>${name}</h1>
        <p> ${address} </p>
    </div>`;

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
    this.setState({
      nonGoogleMarkersArray: { ...this.state.nonGoogleMarkersArray, marker },
    });
  };

  // Google map markers
  createMarker = (latlng, map, placeID, name, address, props) => {
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
    return marker;
  };

  listenToMapClickEvent = (map) => {
    google.maps.event.addDomListener(map, "click", (evt) => {
      this.setState({
        newGoogleForm: true,
        lastMapClickedPos: { lat: evt.latLng.lat(), lng: evt.latLng.lng() },
      });
    });
  };

  onFormSubmit = (name, address) => {
    this.setState({ newGoogleForm: false });
    this.createNonGoogleMarker(
      this.state.lastMapClickedPos,
      this.state.map,
      name,
      address
    );
    let newRestaurantObjectData = {
      id: uuidv1(),
      image:
        "https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2585&q=80",
      restaurantName: name,
      address: address,
      lat: this.state.lastMapClickedPos.lat,
      long: this.state.lastMapClickedPos.lng,
    };
    this.setState({
      formDataRestaurants: [
        ...this.state.formDataRestaurants,
        newRestaurantObjectData,
      ],
    });
  };

  onFormClose = () => {
    this.setState({newGoogleForm: false})
  }

  newLocation(map) {
    window.google.maps.event.addListener(map, "dragend", () => {
      this.refreshMarkersAndSidebar(map);
      this.googlePlacesSearch(map);
    });

    window.google.maps.event.addListener(map, "zoom_changed", () => {
      this.refreshMarkersAndSidebar(map);
      this.googlePlacesSearch(map);
    });
  }

  refreshMarkersAndSidebar(map, props) {
    for (let index = 0; index < this.state.googleMarkersArray.length; index++) {
      this.state.googleMarkersArray[index].setMap(null);
    }
  }

  handleStarChange = (starFilteredRestaurants) => {
    this.setState({ filteredRestaurants: starFilteredRestaurants });

    const markers = [];
    for (let i = 0; i < starFilteredRestaurants.length; i++) {
      markers.push(
        this.createMarker(
          {
            lat: starFilteredRestaurants[i].geometry.location.lat(),
            lng: starFilteredRestaurants[i].geometry.location.lng(),
          },
          map,
          starFilteredRestaurants[i].place_id,
          starFilteredRestaurants[i].name,
          starFilteredRestaurants[i].vicinity
        )
      );
    }
    this.setState({ googleMarkersArray: markers });
  };

  componentDidMount() {
    if (!window.google) {
      let s = document.createElement("script");
      s.type = "text/javascript";
      s.src = `https://maps.google.com/maps/api/js?key=${process.env.REACT_APP_API_MAP_KEY}&libraries=places`;
      let x = document.getElementsByTagName("script")[0];
      x.parentNode.insertBefore(s, x);
      // Below is important.
      // We cannot access google.maps until it is finished loading
      s.addEventListener("load", (e) => {
        this.onScriptLoad();
      });
    } else {
      this.onScriptLoad();
    }
  }
  
  render() {
    return (
      <div>
        <div className="mapStyle" id={this.props.id}></div>
        <div className="new-restaurant-form">
          {this.state.newGoogleForm ? (
            <AddNewRestaurantForm
              map={this.state.map}
              latlng={this.state.latlng}
              onFormSubmit={this.onFormSubmit}
              onFormClose={this.onFormClose}
             
            />
          ) : (
            ""
          )}
        </div>
        <div>
          <Sidebar
            label="Restaurants"
            googleRestaurants={this.state.googleRestaurant}
            onHandleChange={this.handleStarChange}
            forceFilterInit={this.state.forceFilterInit}
          >
            {this.state.formDataRestaurants.map((restaurant) => {
              return (
                <div key={restaurant.id}>
                  <RestaurantContent restaurant={restaurant} />
                </div>
              );
            })}
            <RestaurantData rating={5} map={this.state.map} />
            <GoogleRestaurant
              googleRestaurants={this.state.filteredRestaurants}
              map={this.state.map}
            />
          </Sidebar>
        </div>
      </div>
    );
  }
}

export default Map;
