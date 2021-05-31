import React, { useState, useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import UserReviews from "../user-reviews/UserReviews";
import UserReviewForm from "../user-review-form/UserReviewForm";
import { v1 as uuidv1 } from "uuid";
import "./GoogleRestaurantData.css";


const google = window.google;

const GoogleRestaurantData = ({
  googleRestaurant: {  place_id, img, name, address, map },
}) => {
  const [showRatings, setShowRatings] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showUserReviewForm, setShowUserReviewForm] = useState(false);
  const [userReviews, setUserReviews] = useState([]);

  const getPlacesDetails = (map) => {
    let request = {
      placeId: place_id,
      fields: ["reviews"],
    };
    let service = new google.maps.places.PlacesService(map);
    service.getDetails(request, callback);
  };

  const callback = (place, status) => {

    if (status === google.maps.places.PlacesServiceStatus.OK) {
      console.log(place);
      if (place.reviews) {
        setReviews(place.reviews);
      }
   
    }
  };

  const showGoogleResRatings = useCallback(() => {
    if (map) {
      getPlacesDetails(map);
    }
  }, [map]);

  // user review form submit
  const onFormSubmit = (rating, review, name) => {
    setShowUserReviewForm(false);

    let newReviewObjectData = {
      id: uuidv1(),
      rating: rating,
      review: review,
      name: name,
    };
    setUserReviews([...userReviews, newReviewObjectData]);
  };

  return (
    <div >
      <img src={img} alt="Restaurant" style={{ width: "80%" }} />
      <h2>{name}</h2>
      <p>{address} </p>
      <div
        onClick={() => {
          setShowRatings(!showRatings);
          showGoogleResRatings();
        }}
      >
        {!showRatings ? (
          <AiOutlinePlus className="ratings-icon" />
        ) : (
          <AiOutlineMinus className="ratings-icon" />
        )}
      </div>
     {showRatings ? <button
        className="toggle-button"
        style={{ margin: "15px" }}
        onClick={() => setShowUserReviewForm(true)}>
        Add review
      </button>: ''}
      {showUserReviewForm ? <UserReviewForm onFormSubmit={onFormSubmit} /> : ""}
      {showRatings
        ? userReviews.map((review) => {
            return (
              <UserReviews
                key={uuidv1()}
                rating={review.rating}
                review={review.review}
                name={review.name}
              />
            )
          })
        : ""}
      {showRatings
        ? reviews.map((review) => {
            return (
              <UserReviews
                key={uuidv1()}
                rating={review.rating}
                review={review.text}
                name={review.author_name}
              />
            );
          })
        : ""}
      <hr />
    </div>
  );
};

export default GoogleRestaurantData;
