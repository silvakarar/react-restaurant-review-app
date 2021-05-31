import React, { useState } from "react";
import StarRating from "../star-rating/StarRating";
import "./Sidebar.css";

const Sidebar = props => {
  const [isOpen, setIsopen] = useState(false);

  return (
    <div
      className="collapsible"
      style={isOpen ? { paddingBottom: "20px" } : { paddingBottom: "0px" }}>
      <div className="heading-button-div">
        <div className="restaurant-search">
          <h4>Search Restaurants by Rating</h4>
          <StarRating
            googleRestaurants={props.googleRestaurants}
            onStarChange={props.onHandleChange}
            forceFilterInit={props.forceFilterInit}/>
        </div>
        <button className="toggle-button" onClick={() => setIsopen(!isOpen)}>
          {props.label}
        </button>
      </div>
      <div
        className="content-parent"
        style={
          isOpen
            ? {
                height: 450 + "px",
                paddingBottom: "70px",
                paddingTop: "50px",
              }
            : {
                height: "0px",
                backgroundColor: "#fff",
              }}>
        <div className="content" style={{ fontWeight: "normal" }}>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
