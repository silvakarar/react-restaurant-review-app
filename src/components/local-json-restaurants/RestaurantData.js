import React from "react";
import resData from "../../resData.json";
import RestaurantContent from "./RestaurantContent";

const RestaurantData = () => {
  let newResData = resData.map((restaurant) => {
    return (
      <div key={restaurant.id}>
        <RestaurantContent restaurant={restaurant} />
      </div>
    );
  });

  return newResData;
};
export default RestaurantData;
