import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { v1 as uuidv1 } from "uuid";

// Local JSON file restaurants
const RestaurantContent = ({ restaurant }) => {
  const [readMore, setReadMore] = useState();

  return (
    <div>
      <div>
        <img
          src={restaurant.image}
          alt="Restaurant"
          className="content-image"
        />
        <h2 className="restaurant-name">{restaurant.restaurantName}</h2>
        <div className="restaurant-rating"></div>
        <p>{restaurant.address}</p>
        <div
          onClick={() => setReadMore(!readMore)}
          style={{ marginTop: "1rem" }}
        >
          {!readMore ? (
            <AiOutlinePlus fontSize="1.5em" />
          ) : (
            <AiOutlineMinus fontSize="1.5em" />
          )}
          {readMore
            ? restaurant.ratings.map((review) => {
                return (
                  <article className="review" key={uuidv1()}>
                    <p>{review.comment}</p>
                  </article>
                );
              })
            : ""}
        </div>
        <hr />
        <div> </div>
        <div></div>
      </div>
    </div>
  );
};
export default RestaurantContent;
