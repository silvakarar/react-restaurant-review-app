import React from "react";

const UserReviews = ({ rating, review, name }) => {
  return (
    <article className="review">
      <p
        style={{
          fontWeight: "bold",
          fontSize: "2rem",
          marginTop: "5px",
          color: "#ffc93c",
        }}>
        {rating}
      </p>
      <p style={{ marginTop: "5px" }}>{review}</p>
      <p style={{ fontWeight: "bold", marginTop: "5px" }}>{name}</p>
      <br />
    </article>
  );
};

export default UserReviews;
