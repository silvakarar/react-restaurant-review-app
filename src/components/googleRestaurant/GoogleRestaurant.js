import React from "react";
import GoogleRestaurantData from "./GoogleRestaurantData";

const GoogleRestaurant = (props) => {
  return (
    <div>
      {props.googleRestaurants.map((googleRestaurant) => {
        let googleResImg = null;
        if (googleRestaurant.photos) {
          googleResImg = googleRestaurant.photos[0].getUrl();
        }

        return (
          <GoogleRestaurantData
            key={googleRestaurant.place_id}
            googleRestaurant={{
              place_id: googleRestaurant.place_id,
              img: googleResImg,
              name: googleRestaurant.name,
              address: googleRestaurant.vicinity,
              rating: googleRestaurant.rating,
              map: props.map,
            }}
          />
        );
      })}
    </div>
  );
};

export default GoogleRestaurant;
