import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { v1 as uuidv1 } from 'uuid';

import "./StarRating.css";

const StarRating = (props) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(1); 


  const filterRes = (filteredRatingValue) => {
      setRating({ rating: filteredRatingValue });
      const filteredArray = props.googleRestaurants.filter(
        googleRestaurant => googleRestaurant.rating >= filteredRatingValue
      );
      props.onStarChange(filteredArray);
  };
  useEffect(() => {
    if (props.forceFilterInit) {
      filterRes(1); 
    }
 
    else if(rating) {
      filterRes(rating.rating);      
    }
  
  }, [props.forceFilterInit, props.googleRestaurants]) 

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
  
        return (
          <label htmlFor={"starRating" + ratingValue} key={uuidv1()} >
            <input
              type="radio"
              name="rating"
              id={"starRating" + ratingValue}
              value={ratingValue}
              onClick={() => filterRes(ratingValue)}
            />
            <FaStar
              className="star"
              size={30}
              color={ratingValue <= (hover || rating) ? "#ffc93c" : "#6e7c7c"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(ratingValue)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
